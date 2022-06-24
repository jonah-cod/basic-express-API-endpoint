const router = require('express').Router();

const { getUsers, getUser, login, home } = require('../controllers/usersControllers');

router.get('/', home)

router.get('/users', getUsers)

router.get('/user/:email', getUser)

router.post('/login', login)

module.exports = {router}