const express = require("express");
const router = express.Router();

const getElementTables = {
    database_types: require("../../../bd/api/tables/database_types").getElement,
    databases: require("../../../bd/api/tables/databases").getElement,
    gits: require("../../../bd/api/tables/gits").getElement,
    groups: require("../../../bd/api/tables/groups").getElement,
    servers: require("../../../bd/api/tables/servers").getElement,
    site_groups: require("../../../bd/api/tables/site_groups").getElement,
    sites: require("../../../bd/api/tables/sites").getElement,
    users: require("../../../bd/api/tables/users").getElement,
};

/**
 * Получение элемента из table по id
 * @param table{String} обязательное поле
 * @param id{Number} обязательное поле
 */
router.get("/", (req, res) => {
    const { table, id, enrich = "false" } = req.query;

    if (!table || !id) {
        return res.status(400).json({ error: "Параметры 'table' и 'id' обязательны." });
    }

    if (!getElementTables[table]) {
        return res.status(400).json({ error: `Получение элемента для таблицы '${table}' не поддерживается.` });
    }

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Параметр 'id' должен быть числом." });
    }

    getElementTables[table](parsedId, enrich === "true")
        .then((result) => {
            if (!result) {
                return res.status(404).json({ error: "Элемент не найден." });
            }
            res.json(result);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
