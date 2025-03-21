const db = require("../../index");
const serversApi = require("./servers");
const databasesApi = require("./databases");
const gitsApi = require("./gits");
const groupsApi = require("./groups");

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
const getList = (filters, sort, search, from, size, enrich = false) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT
                s.*,
                GROUP_CONCAT(DISTINCT sg.group_id) AS site_groups_ids,
                (SELECT databases.name FROM databases WHERE s.database_id = databases.id) AS database_name,
                (SELECT servers.host FROM servers WHERE s.server_id = servers.id) AS server_host
            FROM sites s
                     LEFT JOIN site_groups sg ON s.id = sg.site_id
        `;

        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("(s.name LIKE ? OR s.url LIKE ? OR server_host LIKE ? OR database_name LIKE ?)");
            params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (filters && filters.server_id) {
            conditions.push("s.server_id = ?");
            params.push(filters.server_id);
        }

        if (filters && filters.group_id) {
            conditions.push("g.id = ?");
            params.push(filters.group_id);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` GROUP BY s.id`

        if (sort) {
            query += ` ORDER BY ${sort.column} ${sort.order === "desc" ? "DESC" : "ASC"}`;
        }

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
                try {
                    if (enrich) {
                        const enrichedRows = await Promise.all(
                            rows.map(async (row) => {
                                if (row.server_id) {
                                    row.server = await serversApi.getElement(row.server_id, enrich);
                                    delete row.server_id;
                                }
                                if (row.database_id) {
                                    row.database = await databasesApi.getElement(row.database_id, enrich);
                                    delete row.database_id;
                                }
                                if (row.git_id) {
                                    row.git = await gitsApi.getElement(row.git_id, enrich);
                                    delete row.git_id;
                                }
                                if (row.site_groups_ids) {
                                    row.site_groups = [];
                                    row.site_groups_ids.split(",").forEach(async (groupId) => {
                                        row.site_groups.push(await groupsApi.getElement(parseInt(groupId), enrich));
                                    });
                                    delete row.site_groups_ids;
                                }
                                return row;
                            })
                        );
                        resolve({total, data: enrichedRows});
                    } else resolve({total, data: rows});
                } catch (error) {
                    reject(error);
                }
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
        const query = "SELECT * FROM sites WHERE id = ?";
        db.get(query, [id], async (err, row) => {
            if (err) return reject(err);
            if (!row)  return resolve(null);
            try {
                if (enrich) {
                    if (row.server_id) {
                        row.server = await serversApi.getElement(row.server_id, enrich);
                        delete row.server_id;
                    }
                    if (row.database_id) {
                        row.database = await databasesApi.getElement(row.database_id, enrich);
                        delete row.database_id;
                    }
                    if (row.git_id) {
                        row.git = await gitsApi.getElement(row.git_id, enrich);
                        delete row.git_id;
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
        const { name, previewImg, url, server_id, database_id, git_id } = data;

        if (!name || !url) {
            return reject(new Error("Поля 'name' и 'url' обязательны."));
        }

        db.get("SELECT id FROM sites WHERE name = ?", [name], (err, row) => {
            if (err) return reject(err);
            if (row) return reject(new Error(`Запись с именем "${name}" уже существует.`));

            const query = `
            INSERT INTO sites (name, previewImg, url, server_id, database_id, git_id)
            VALUES (?, ?, ?, ?, ?, ?)`;

            const params = [name, previewImg || null, url, server_id || null, database_id || null, git_id || null];

            db.run(query, params, function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, ...data });
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

        const query = `DELETE FROM sites WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Сайт не найден."));
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
        const { name, previewImg, url, server_id, database_id, git_id } = data;

        if (!name && !previewImg && !url && !server_id && !database_id && !git_id) {
            return reject(new Error("Нет данных для обновления"));
        }

        let updates = [];
        let params = [];

        if (name) updates.push("name = ?"), params.push(name);
        if (previewImg) updates.push("previewImg = ?"), params.push(previewImg);
        if (url) updates.push("url = ?"), params.push(url);
        if (server_id) updates.push("server_id = ?"), params.push(server_id);
        if (database_id) updates.push("database_id = ?"), params.push(database_id);
        if (git_id) updates.push("git_id = ?"), params.push(git_id);

        params.push(id);
        const query = `UPDATE sites SET ${updates.join(", ")} WHERE id = ?`;

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve({ success: true, changes: this.changes });
        });
    });
};

module.exports = { getList, getElement, createElement, deleteElement, putElement };