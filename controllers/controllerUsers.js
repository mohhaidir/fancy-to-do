const { Users } = require('../models')

class ControllerUsers {
  static register(req, res, next) {
    const user = req.body
    Users.create(user)
      .then(result => {
        res.status(201).json({ result: result })
      })
      .catch(err => {
        if (err.errors) {
          let errorArguments = []
          err.errors.forEach(e => {
            errorArguments.push({
              type: e.type,
              msg: e.message
            })
          });
          next({ status: 400, errors })
          res.status(400).json(error)
        }
        res.status(500)
      })
  }

  static login(req, res, next) {

  }
}

module.exports = ControllerUsers