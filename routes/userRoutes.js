const router = require('express').Router();

const { getUsers, getUser, login, home, create } = require('../controllers/usersControllers');

router.get('/', home)

router.get('/users', getUsers)

router.get('/user/:email', getUser)

router.post('/login', login)
router.post('/createuser', create)

module.exports = {router}