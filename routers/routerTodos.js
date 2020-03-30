const express = require('express')
const router = express.Router()
const ControllerTodos = require('../controllers/controllerTodos')

router.post('/', ControllerTodos.postTodos)
router.get('/', ControllerTodos.getTodos)

module.exports = router