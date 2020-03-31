const express = require('express')
const router = express.Router()
const ControllerTodos = require('../controllers/controllerTodos')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, ControllerTodos.postTodos)
router.get('/', authentication, ControllerTodos.getTodos)

router.get('/:id', authentication, authorization, ControllerTodos.getTodosId)
router.put('/:id', authentication, authorization, ControllerTodos.putTodosId)
router.delete('/:id', authentication, authorization, ControllerTodos.deleteTodosId)

module.exports = router