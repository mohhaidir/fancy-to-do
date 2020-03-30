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
        if (err.errors) {
          // console.log(err)
          const errorArgument = []
          for (let i = 0; i < err.errors.length; i++) {
            errorArgument.push(err.errors[i].message)
          }
          // console.log(errorArgument)
          // console.log('masuk 400')
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
    const pk = Number(req.params.id)
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
    const id = Number(req.params.id)
    const data = req.body
    // console.log(id)
    Todos.update(data, { where: { id: id } })
      .then(result => {
        if (result[0] == 0) {
          const msg = 'not found!'
          res.status(404).json(msg)
        } else {
          // console.log(data)
          res.status(200).json(data)
        }
      })
      .catch(err => {
        if (err) {
          const errorArgument = []
          for (let i = 0; i < err.errors.length; i++) {
            errorArgument.push(err.errors[i].message)
          }
          res.status(400).json(errorArgument)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static deleteTodosId(req, res) {
    const id = Number(req.params.id)
    let deletedData = null
    Todos.findByPk(id)
      .then(result => {
        deletedData = result
        if (result) {
          return Todos.destroy({ where: { id: id } })
        } else {
          const notFound = 'data not found'
          res.status(404).json(notFound)
        }
      })
      .then(result2 => {
        const deleted = [deletedData, 'data telah dihapus !']
        res.status(200).json(deleted)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ControllerTodos