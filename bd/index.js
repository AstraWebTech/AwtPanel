const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.sqlite", (err) => {
    if (err) console.error("Ошибка подключения к БД:", err.message);
    else console.log("✅  Подключено к SQLite.");
});

module.exports = db;