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
        let query = `SELECT * FROM groups`;
        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("name LIKE ?");
            params.push(`%${search}%`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;

        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
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
        const query = "SELECT * FROM groups WHERE id = ?";
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
        const { name, previewImg, description } = data;

        if (!name) {
            return reject(new Error("Поле 'name' обязательно."));
        }

        db.get("SELECT id FROM groups WHERE name = ?", [name], (err, row) => {
            if (err) return reject(err);
            if (row) return reject(new Error(`Запись с именем "${name}" уже существует.`));

            const query = `INSERT INTO groups (name, previewImg, description) VALUES (?, ?, ?)`;
            const params = [name, previewImg || null, description || null];

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

        const query = `DELETE FROM groups WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Группа не найдена."));
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
        const { name, previewImg, description } = data;

        if (!name && !previewImg && !description) {
            return reject(new Error("Нет данных для обновления"));
        }

        let updates = [];
        let params = [];

        if (name) updates.push("name = ?"), params.push(name);
        if (previewImg) updates.push("previewImg = ?"), params.push(previewImg);
        if (description) updates.push("description = ?"), params.push(description);

        params.push(id);
        const query = `UPDATE groups SET ${updates.join(", ")} WHERE id = ?`;

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve({ success: true, changes: this.changes });
        });
    });
};


module.exports = { getList, getElement, createElement, deleteElement, putElement };
