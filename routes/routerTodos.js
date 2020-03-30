const express = require('express')
const router = express.Router()
const ControllerTodos = require('../controllers/controllerTodos')

router.post('/', ControllerTodos.postTodos)
router.get('/', ControllerTodos.getTodos)
router.get('/:id', ControllerTodos.getTodosId)
router.put('/:id', ControllerTodos.putTodosId)
router.delete('/:id', ControllerTodos.deleteTodosId)

module.exports = router