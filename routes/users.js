const express = require('express');
const UsersService = require('../services/users');

function usersApi(app) {
    const router = express.Router();
    app.use('/api/users', router);

    const userService = new UsersService();

    router.get('/:username', async function (req, res, next) {
        const { username } = req.params;
        try {
            const user = await userService.getUser({ username });
            res.status(200).json({
                ... user,
                uri: `/users/${username}`
            });            
        } catch (error) {
            next(error);
        }
    })
}

module.exports = usersApi;