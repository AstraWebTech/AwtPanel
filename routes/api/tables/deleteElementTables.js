const express = require("express");
const router = express.Router();

const deleteElementTables = {
    database_types: require("../../../bd/api/tables/database_types").deleteElement,
    databases: require("../../../bd/api/tables/databases").deleteElement,
    gits: require("../../../bd/api/tables/gits").deleteElement,
    groups: require("../../../bd/api/tables/groups").deleteElement,
    servers: require("../../../bd/api/tables/servers").deleteElement,
    site_groups: require("../../../bd/api/tables/site_groups").deleteElement,
    sites: require("../../../bd/api/tables/sites").deleteElement,
    users: require("../../../bd/api/tables/users").deleteElement,
};

/**
 * Удаление элемента из table
 * @param table{String} обязательное поле
 * @param id{Number} обязательное поле
 */
router.delete("/", (req, res) => {
    const { table, id, site_id = null, group_id = null } = req.query;

    if (!table) {
        return res.status(400).json({ error: "Параметр обязателен." });
    }

    if (!deleteElementTables[table]) {
        return res.status(400).json({ error: `Удаление элементов для таблицы '${table}' не поддерживается.` });
    }

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Параметр 'id' должен быть числом." });
    }
    const data = table === "site_groups" ? { site_id, group_id } : parsedId;

    deleteElementTables[table](data)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
