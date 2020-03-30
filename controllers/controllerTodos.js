const { Todos } = require('../models')

class ControllerTodos {
  static postTodos(req, res) {
    const data = req.body
    Todos.create(data)
      .then(result => {
        // console.log(result)
        res.status(201).json(result)
      })
      .catch(err => {
        if (err) {
          // console.log(err)
          const errorArgument = []
          for (let i = 0; i < err.errors.length; i++) {
            errorArgument.push(err.errors[i].message)
          }
          // console.log('masuk error')
          // console.log(errorArgument)
          res.status(400).json(errorArgument)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static getTodos(req, res) {
    Todos.findAll()
      .then(result => {
        // console.log(result)
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getTodosId(req, res) {
    const pk = req.params.id
    Todos.findByPk(pk)
      .then(result => {
        if (result == null) {
          const notFound = {
            msg: `data dengan id: ${pk} tidak ditemukan!`
          }
          res.status(404).json(notFound)
        } else {
          res.status(200).json(result)
        }
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static putTodosId(req, res) {

  }

  static deleteTodosId(req, res) {

  }
}

module.exports = ControllerTodos