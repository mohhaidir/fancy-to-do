const express = require('express')
const router = express.Router()
const routerTodos = require('./routerTodos')
const routerUsers = require('./routerUsers')

router.use('/todos', routerTodos)
router.use('/users', routerUsers)

module.exports = router