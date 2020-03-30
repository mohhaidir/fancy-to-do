const express = require('express')
const router = express.Router()
const ControllerTodos = require('../controllers/controllerTodos')

router.post('/', ControllerTodos.postTodos)
router.get('/', ControllerTodos.getTodos)
router.get('/edit/:id', ControllerTodos.getTodosId)
router.put('/edit/:id', ControllerTodos.putTodosId)
// router.delete('/delete/:id', ControllerTodos.deleteTodosId)

module.exports = router