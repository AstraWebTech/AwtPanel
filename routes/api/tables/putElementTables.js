const express = require("express");
const router = express.Router();

const putElementTables = {
    database_types: require("../../../bd/api/tables/database_types").putElement,
    databases: require("../../../bd/api/tables/databases").putElement,
    gits: require("../../../bd/api/tables/gits").putElement,
    servers: require("../../../bd/api/tables/servers").putElement,
    sites: require("../../../bd/api/tables/sites").putElement,
    groups: require("../../../bd/api/tables/groups").putElement,
    site_groups: require("../../../bd/api/tables/site_groups").putElement,
};

/**
 * Обновление элемента из table по id
 * table{String} обязательное поле
 * id{Number} обязательное поле
 */
router.put("/", (req, res) => {
    const { table, id, ...data } = req.body;
    if (!table || !id) {
        return res.status(400).json({ error: "'table' и 'id' обязательны" });
    }

    if (!putElementTables[table]) {
        return res.status(400).json({ error: `Редактирование элементов для таблицы '${table}' не поддерживается.` });
    }

    putElementTables[table](id, data)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
