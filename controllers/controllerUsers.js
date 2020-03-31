const { Users } = require('../models')
const generateToken = require('../helpers/generateToken')
const comparePassword = require('../helpers/comparePassword')

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
        } else {
          res.status(500)
        }
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    Users.findOne({ where: { email } })
      .then(result => {
        if (result) {
          return comparePassword(password, result.password)
            .then(result => {
              if (result) {
                let token = generateToken(result)
                res.status(200).json({ token })
              } else {
                throw { status: 400, msg: 'wrong password' }
              }
            })
        } else {
          throw { status: 404, msg: 'wrong email' }
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ControllerUsers