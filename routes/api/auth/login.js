const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersApi = require('../../../bd/api/tables/users');

const SECRET_KEY = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).send({ message: 'Login and password are required' });
    }

    try {
        const user = await usersApi.login(login);

        if (!user) {
            return res.status(401).send({ message: 'Invalid login or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ message: 'Invalid login or password' });
        }

        const token = jwt.sign({ id: user.id, login: user.login }, SECRET_KEY, { expiresIn: '1h' });

        res.send({ message: 'Login successful', token });
    } catch (error) {
        res.status(error.code || 500).send({ message: error.message });
    }
});

module.exports = router;