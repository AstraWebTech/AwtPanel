const db = require("../../index");

/**
 * Получает список элементов с фильтрами, сортировкой и поиском.
 * @param {Object} filters - Объект с фильтрами (например, { id: 1 }).
 * @param {Object} sort - Объект с параметрами сортировки (например, { column: "name", order: "asc" }).
 * @param {string} search - Строка для поиска (если требуется).
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getList = (filters, sort, search) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM database_types`;
        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("name LIKE ? OR code LIKE ?");
            params.push(`%${search}%`, `%${search}%`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;

        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            const total = rows ? rows.length : 0;
            resolve({total: total, data: rows});
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
        const query = "SELECT * FROM database_types WHERE id = ?";
        db.get(query, [id], async (err, row) => {
            if (err) return reject(err);
            if (!row) return resolve(null);
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
        const { name, code } = data;

        if (!name || !code) {
            return reject(new Error("Поля 'name' и 'code' обязательны."));
        }

        db.get("SELECT id FROM database_types WHERE code = ? OR  name = ?", [code, name], (err, row) => {
            if (err) return reject(err);
            if (row) return reject(new Error("Такая запись существует."));
            const query = `INSERT INTO database_types (name, code) VALUES (?, ?)`;
            db.run(query, [name, code], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, name, code });
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

        const query = `DELETE FROM database_types WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Тип базы данных не найден."));
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
        const { name, code } = data;

        if (!name && !code) {
            return reject(new Error("Нет данных для обновления"));
        }

        let updates = [];
        let params = [];

        if (name) {
            updates.push("name = ?");
            params.push(name);
        }
        if (code) {
            updates.push("code = ?");
            params.push(code);
        }

        params.push(id);
        const query = `UPDATE database_types SET ${updates.join(", ")} WHERE id = ?`;

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve({ success: true, changes: this.changes });
        });
    });
};

module.exports = { getList, getElement, createElement, deleteElement, putElement };