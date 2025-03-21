const express = require("express");
const router = express.Router();

const createElementTables = {
    database_types: require("../../../bd/api/tables/database_types").createElement,
    databases: require("../../../bd/api/tables/databases").createElement,
    gits: require("../../../bd/api/tables/gits").createElement,
    groups: require("../../../bd/api/tables/groups").createElement,
    servers: require("../../../bd/api/tables/servers").createElement,
    site_groups: require("../../../bd/api/tables/site_groups").createElement,
    sites: require("../../../bd/api/tables/sites").createElement,
    users: require("../../../bd/api/tables/users").createElement,
};

/**
 * Создание элемента для table
 * @param table{String} обязательное поле
 * @param data{Object} обязательное поле
 */
router.post("/", (req, res) => {
    const { table, data } = req.body;

    if (!table || !data) {
        return res.status(400).json({ error: "Параметры 'table' и 'data' обязательны." });
    }

    if (!createElementTables[table]) {
        return res.status(400).json({ error: `Создание элементов для таблицы '${table}' не поддерживается.` });
    }

    createElementTables[table](data)
        .then((result) => res.status(201).json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
