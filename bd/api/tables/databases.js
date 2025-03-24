const db = require("../../index");
const serversApi = require("./servers");
const databaseTypesApi = require("./database_types");

/**
 * Получает список элементов с фильтрами, сортировкой и поиском.
 * @param {Object} filters - Объект с фильтрами (например, { id: 1 }).
 * @param {Object} sort - Объект с параметрами сортировки (например, { column: "name", order: "asc" }).
 * @param {string} search - Строка для поиска (если требуется).
 * @param {Number} from - От какой записи выдать.
 * @param {Number} size - Кол-во записей которые надо вернуть.
 * @param {boolean} enrich - Флаг, указывающий, нужно ли обогащать данные.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getList = (filters, sort, search, from, size, enrich) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT
                *,
                (SELECT servers.host FROM servers WHERE servers.id = databases.server_id) AS server_host,
                (SELECT database_types.name FROM database_types WHERE database_types.id = databases.type_id) AS type_name
            FROM databases
        `;
        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("name LIKE ? OR user LIKE ? OR server_host LIKE ? OR type_name LIKE ?");
            params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (filters.server_id) {
            conditions.push("server_id = ?");
            params.push(filters.server_id);
        }

        if (filters.type_id) {
            conditions.push("type_id = ?");
            params.push(filters.type_id);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;

        db.all(query, params, async (err, countResult) => {
            if (err) return reject(err);
            const total = countResult ? countResult.length : 0;

            if (typeof from !== "undefined" && typeof size !== "undefined") {
                const offset = Math.max(0, from);
                const limit = Math.max(0, size);
                query += " LIMIT ? OFFSET ?";
                params.push(limit, offset);
            }

            db.all(query, params, async (err, rows) => {
                if (enrich) {
                    const enrichedRows = await Promise.all(
                        rows.map(async (row) => {
                            if (row.server_id) {
                                row.server = await serversApi.getElement(row.server_id, enrich);
                                delete row.server_id;
                            }
                            if (row.type_id) {
                                row.type = await databaseTypesApi.getElement(row.type_id, enrich);
                                delete row.type_id;
                            }
                            return row;
                        })
                    );
                    resolve({total, data: enrichedRows});
                } else resolve({total, data: rows});
            });

        });
    });
};

/**
 * Получает один элемент по ID.
 * @param {number} id - Идентификатор элемента.
 * @param {boolean} enrich - Флаг, указывающий, нужно ли обогащать данные.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getElement = (id, enrich = false) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM databases WHERE id = ?";
        db.get(query, [id], async (err, row) => {
            if (err) return reject(err);
            if (!row) return resolve(null);
            try {
                if (enrich) {
                    if (row.server_id) {
                        row.server = await serversApi.getElement(row.server_id, enrich);
                        delete row.server_id;
                    }
                    if (row.type_id) {
                        row.type = await databaseTypesApi.getElement(row.type_id, enrich);
                        delete row.type_id;
                    }
                }
                resolve(row);
            } catch (error) {
                reject(error);
            }
        });
    });
};

/**
 * Создание элемента таблицы
 * @param data - Данные для создания элемента
 * @return {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const createElement = (data) => {
    return new Promise((resolve, reject) => {
        const { name, user, password, server_id, type_id } = data;

        if (!name || !server_id || !user || !password || !type_id) {
            return reject(new Error("Поля 'name', 'server_id', 'user', 'password' и 'type_id' обязательны."));
        }

        db.get("SELECT id FROM databases WHERE name = ?", [name], (err, row) => {
            if (err) return reject(err);
            if (row) return reject(new Error(`Запись с именем "${name}" уже существует.`));

            const query = `INSERT INTO databases (name, user, password, server_id, type_id) VALUES (?, ?, ?, ?, ?)`;
            db.run(query, [name, user, password, server_id, type_id], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, name, user, type_id });
            });
        });
    });
};

/**
 * Удаление элемента таблицы
 * @param id
 * @return {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const deleteElement = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID обязателен."));

        const query = `DELETE FROM databases WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("База данных не найдена."));
            resolve({ success: true });
        });
    });
};

/**
 * Обновление данных в таблице
 * @param id{number}
 * @param data{Object}
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const putElement = (id, data) => {
    return new Promise((resolve, reject) => {
        const { name, host, user, password, server_id, type_id } = data;

        if (!name && !host && !user && !password && !server_id && !type_id) {
            return reject(new Error("Нет данных для обновления"));
        }

        let updates = [];
        let params = [];

        if (name) updates.push("name = ?"), params.push(name);
        if (host) updates.push("host = ?"), params.push(host);
        if (user) updates.push("user = ?"), params.push(user);
        if (password) updates.push("password = ?"), params.push(password);
        if (server_id) updates.push("server_id = ?"), params.push(server_id);
        if (type_id) updates.push("type_id = ?"), params.push(type_id);

        params.push(id);
        const query = `UPDATE databases SET ${updates.join(", ")} WHERE id = ?`;

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve({ success: true, changes: this.changes });
        });
    });
};

module.exports = { getList, getElement, createElement, deleteElement, putElement };