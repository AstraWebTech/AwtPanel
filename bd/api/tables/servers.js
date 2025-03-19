const db = require("../../index");

/**
 * Получает список элементов с фильтрами, сортировкой и поиском.
 * @param {Object} filters - Объект с фильтрами (например, { id: 1 }).
 * @param {Object} sort - Объект с параметрами сортировки (например, { column: "name", order: "asc" }).
 * @param {string} search - Строка для поиска (если требуется).
 * @param {Number} from - От какой записи выдать.
 * @param {Number} size - Кол-во записей которые надо вернуть.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getList = (filters, sort, search, from, size) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT id, name, host, login FROM servers`;
        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("name LIKE ? OR host LIKE ? OR login LIKE ?");
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;

        db.all(query, params, (err, countResult) => {
            if (err) return reject(err);
            const total = countResult ? countResult.length : 0;

            if (typeof from !== "undefined" && typeof size !== "undefined") {
                const offset = Math.max(0, from);
                const limit = Math.max(0, size);
                query += " LIMIT ? OFFSET ?";
                params.push(limit, offset);
            }

            db.all(query, params, (err, rows) => {
                resolve({total, data: rows});
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
        const query = "SELECT * FROM servers WHERE id = ?";
        db.get(query, [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
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
        const { name, login, password, host } = data;

        if (!name || !host) {
            return reject(new Error("Поля 'name' и 'host' обязательны."));
        }

        db.get("SELECT id FROM servers WHERE name = ?", [name], (err, row) => {
            if (err) return reject(err);
            if (row) return reject(new Error(`Запись с именем "${name}" уже существует.`));

            const query = `INSERT INTO servers (name, login, password, host) VALUES (?, ?, ?, ?)`;
            db.run(query, [name, login, password, host], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, name, login, host });
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

        const query = `DELETE FROM servers WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Сервер не найден."));
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
        const { name, login, password, host } = data;

        if (!name && !login && !password && !host) {
            return reject(new Error("Нет данных для обновления"));
        }

        let updates = [];
        let params = [];

        if (name) {
            updates.push("name = ?");
            params.push(name);
        }
        if (login) {
            updates.push("login = ?");
            params.push(login);
        }
        if (password) {
            updates.push("password = ?");
            params.push(password);
        }
        if (host) {
            updates.push("host = ?");
            params.push(host);
        }

        params.push(id);

        const query = `UPDATE servers SET ${updates.join(", ")} WHERE id = ?`;

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve({ success: true, changes: this.changes });
        });
    });
};

module.exports = { getList, getElement, createElement, deleteElement, putElement };