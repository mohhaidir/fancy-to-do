const express = require('express')
const router = express.Router()
const routerTodos = require('./routerTodos')

router.use('/todos', routerTodos)

module.exports = router