const express = require('express');
const router = express.Router();
const usersApi = require('../../../bd/api/tables/users');

router.post('/', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).send({ message: 'Login and password are required' });
    }

    try {
        const result = await usersApi.register(login, password);
        res.status(201).send({ message: 'User registered successfully', userId: result.id });
    } catch (error) {
        res.status(error.code || 500).send({ message: error.message });
    }
});

module.exports = router;