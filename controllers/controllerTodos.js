const { Todos } = require('../models')

class ControllerTodos {
  static postTodos(req, res) {
    const data = req.body
    Todos.create(data)
      .then(result => {
        res.status(201).json({ result })
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json({ errors: err.errors })
        } else {
          res.status(500).json({ errors: err })
        }
      })
  }

  static getTodos(req, res) {
    Todos.findAll()
      .then(result => {
        res.status(200).json({ result: result })
      })
      .catch(err => {
        res.status(500).json({ errors: err })
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
          res.status(404).json({ result: notFound })
        } else {
          res.status(200).json({ result })
        }
      })
      .catch(err => {
        res.status(404).json({ err })
      })
  }

  static putTodosId(req, res) {
    const id = Number(req.params.id)
    const data = req.body
    Todos.update(data, { where: { id: id } })
      .then(result => {
        if (result[0] == 0) {
          const msg = 'not found!'
          res.status(404).json({ errors: msg })
        } else {
          res.status(200).json({ result: data })
        }
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json({ errors: err.errors })
        } else {
          res.status(500).json({ errors: err })
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
          const notFound = `data with id: ${id} not found`
          res.status(404).json({ errors: { notFound } })
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