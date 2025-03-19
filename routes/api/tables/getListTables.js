const express = require("express");
const router = express.Router();

const getListTables = {
    database_types: require("../../../bd/api/tables/database_types").getList,
    databases: require("../../../bd/api/tables/databases").getList,
    gits: require("../../../bd/api/tables/gits").getList,
    groups: require("../../../bd/api/tables/groups").getList,
    servers: require("../../../bd/api/tables/servers").getList,
    site_groups: require("../../../bd/api/tables/site_groups").getList,
    sites: require("../../../bd/api/tables/sites").getList
};

/**
 * Получение списка элементов из table с фильтрацией, поиском и сортировкой
 * @param table{String} обязательное поле
 */
router.get("/", (req, res) => {
    const { table, search, server_id, group_id, sort_column = "name", sort_order = "asc", from, size, enrich = "false" } = req.query;

    if (!table) {
        return res.status(400).json({ error: "Параметр 'table' обязателен." });
    }

    if (!getListTables[table]) {
        return res.status(400).json({ error: `Получение элементов для таблицы '${table}' не поддерживается.` });
    }

    const filters = {
        server_id: server_id ? parseInt(server_id, 10) : null,
        group_id: group_id ? parseInt(group_id, 10) : null,
        type_id: group_id ? parseInt(group_id, 10) : null,
    };

    const sort = {
        column: sort_column.replace(/[^a-zA-Z0-9_]/g, ""),
        order: sort_order.toLowerCase() === "desc" ? "desc" : "asc",
    };

    getListTables[table](filters, sort, search, from, size, enrich === "true")
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;