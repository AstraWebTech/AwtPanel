const db = require('../../index');
const bcrypt = require('bcrypt');

/**
 * Регистрация нового пользователя.
 * @param {string} login - Логин пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const register = (login, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return reject({ code: 500, message: 'Internal Server Error' });

            db.run(`INSERT INTO users (login, password) VALUES (?, ?)`, [login, hashedPassword], function(err) {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        return reject({ code: 409, message: 'User already exists' });
                    }
                    return reject({ code: 500, message: 'Internal Server Error' });
                }
                resolve({ id: this.lastID });
            });
        });
    });
};

/**
 * Получение пользователя по логину.
 * @param {string} login - Логин пользователя.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const login = (login) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE login = ?`, [login], (err, row) => {
            if (err) {
                return reject({ code: 500, message: 'Internal Server Error' });
            }
            resolve(row);
        });
    });
};

/**
 * Получение одного элемента по ID.
 * @param {number} id - Идентификатор элемента.
 * @param {boolean} enrich - Флаг, указывающий, нужно ли обогащать данные.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const getElement = (id, enrich = false) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id = ?";
        db.get(query, [id], async (err, row) => {
            if (err) return reject(err);
            if (!row) return resolve(null);
            try {
                resolve(row);
            } catch (error) {
                reject(error);
            }
        });
    });
};

/**
 * Получение списка элементов с фильтрами, сортировкой и поиском.
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
        let query = `SELECT * FROM users`;
        let conditions = [];
        let params = [];

        if (search) {
            conditions.push("(login LIKE ?)");
            params.push(`%${search}%`);
        }

        if (filters && filters.login) {
            conditions.push("login = ?");
            params.push(filters.login);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        if (sort) {
            if(sort.column === "name")
                sort.column = "login";

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
                if (err) return reject(err);
                try {
                    if (enrich) {
                        const enrichedRows = await Promise.all(
                            rows.map(async (row) => {
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
 * Создание элемента таблицы.
 * @param {Object} data - Данные для создания элемента.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const createElement = (data) => {
    return new Promise((resolve, reject) => {
        const { login, password } = data;

        if (!login || !password) {
            return reject(new Error("Поля 'login' и 'password' обязательны."));
        }

        db.get("SELECT id FROM users WHERE login = ?", [login], (err, row) => {
            if (err) return reject(err);
            if (row) return reject(new Error(`Пользователь с логином "${login}" уже существует.`));

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return reject({ code: 500, message: 'Internal Server Error' });

                const query = `
                INSERT INTO users (login, password)
                VALUES (?, ?)`;

                const params = [login, hashedPassword];

                db.run(query, params, function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, ...data });
                });
            });
        });
    });
};

/**
 * Удаление элемента таблицы.
 * @param {number} id - Идентификатор элемента.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const deleteElement = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID обязателен."));

        const query = `DELETE FROM users WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Пользователь не найден."));
            resolve({ success: true });
        });
    });
};

/**
 * Обновление данных в таблице.
 * @param {number} id - Идентификатор элемента.
 * @param {Object} data - Данные для обновления.
 * @returns {Promise} - Промис, который разрешается данными или отклоняется с ошибкой.
 */
const putElement = (id, data) => {
    return new Promise((resolve, reject) => {
        const { login, password, language, theme } = data;

        if (!login && !password && !language && !theme) {
            return reject(new Error("Нет данных для обновления"));
        }

        let updates = [];
        let params = [];

        if (login) updates.push("login = ?"), params.push(login);
        if (password) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return reject({ code: 500, message: 'Internal Server Error' });
                updates.push("password = ?"), params.push(hashedPassword);
            });
        }
        if (language) updates.push("language = ?"), params.push(language);
        if (theme) updates.push("theme = ?"), params.push(theme);


        params.push(id);
        const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve({ success: true, changes: this.changes });
        });
    });
};

module.exports = { register, login, getElement, getList, createElement, deleteElement, putElement };