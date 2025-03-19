const express = require('express');
const router = express.Router();
const dumpApi = require('../../bd/api/dump');

router.get('/', async (req, res) => {
    const { type, host, user, password, database } = req.query;
    console.log({ type, host, user, password, database })

    if (!type) {
        return res.status(400).json({ error: "Параметр 'type' обязателен." });
    }

    if (!host) {
        return res.status(400).json({ error: "Параметр 'host' обязателен." });
    }

    if (!user) {
        return res.status(400).json({ error: "Параметр 'user' обязателен." });
    }

    if (!database) {
        return res.status(400).json({ error: "Параметр 'database' обязателен." });
    }

    try {
        await dumpApi.createDump({type, host, user, password, database}, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
