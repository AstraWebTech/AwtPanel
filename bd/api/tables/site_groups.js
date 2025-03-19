const db = require("../../index");
const { getList: getSites } = require("./sites");

/**
 * Получает список групп с их сайтами.
 * @param {Object} filters - Объект с фильтрами (например, { id: 1 }).
 * @param {Object} sort - Объект с параметрами сортировки (например, { column: "name", order: "asc" }).
 * @param {string} search - Строка для поиска (если требуется).
 * @param {boolean} enrich - Флаг, указывающий, нужно ли обогащать данные.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getList = async (filters, sort, search, enrich) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT g.id, g.name, g.previewImg, g.description FROM groups g`;
        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("g.name LIKE ?");
            params.push(`%${search}%`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;

        db.all(query, params, async (err, groups) => {
            if (err) return reject(err);

            for (let group of groups) {
                group.children = await getSites({ group_id: group.id }, { column: "name", order: "asc" }, "", enrich);
            }

            resolve(groups);
        });
    });
};

/**
 * Получает один элемент по ID.
 * @param {number} id - Идентификатор элемента.
 * @param {boolean} enrich - Флаг, указывающий, нужно ли обогащать данные.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getElement = async (id, enrich = false) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT id, name, previewImg, description FROM groups WHERE id = ?`;
        db.get(query, [id], async (err, group) => {
            if (err) return reject(err);
            if (!group) return resolve(null);
            if (enrich) {
                group.children = await getSites({ group_id: id }, { column: "name", order: "asc" }, "", enrich);
            } else {
                group.children = [];
            }
            resolve(group);
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
        const { site_id, group_id } = data;

        if (!site_id || !group_id) {
            return reject(new Error("Поля 'site_id' и 'group_id' обязательны."));
        }

        db.get(
            "SELECT * FROM site_groups WHERE site_id = ? AND group_id = ?",
            [site_id, group_id],
            (err, row) => {
                if (err) return reject(err);
                if (row) return reject(new Error("Эта связь уже существует."));
                const query = `INSERT INTO site_groups (site_id, group_id) VALUES (?, ?)`;
                db.run(query, [site_id, group_id], function (err) {
                    if (err) return reject(err);
                    resolve({ site_id, group_id });
                });
            }
        );
    });
};

/**
 * Удаление элемента таблицы
 * @param data
 * @return {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const deleteElement = (data) => {
    return new Promise((resolve, reject) => {
        const { site_id, group_id } = data;

        if (!site_id || !group_id) {
            return reject(new Error("Поля 'site_id' и 'group_id' обязательны."));
        }

        const query = `DELETE FROM site_groups WHERE site_id = ? AND group_id = ?`;
        db.run(query, [site_id, group_id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Запись не найдена."));
            resolve({ success: true });
        });
    });
};

/**
 * Обновление данных в таблице
 * @param dataIds{Object}
 * @param data{Object}
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const putElement = (dataIds, data) => {
    return new Promise((resolve, reject) => {
        const { site_id, group_id, new_group_id } = data;

        if (!new_group_id) {
            return reject(new Error("Нет данных для обновления"));
        }

        db.run(
            `UPDATE site_groups SET group_id = ? WHERE site_id = ? AND group_id = ?`,
            [new_group_id, site_id, group_id],
            function (err) {
                if (err) return reject(err);
                resolve({ success: true, changes: this.changes });
            }
        );
    });
};

module.exports = { getList, getElement, createElement, deleteElement, putElement };
