const express = require('express')
const router = express.Router()
const ControllerUsers = require('../controllers/controllerUsers')

router.post('/register', ControllerUsers.register)
router.post('/login', ControllerUsers.login)
router.post('/googleLogin', ControllerUsers.googleLogin)

module.exports = router