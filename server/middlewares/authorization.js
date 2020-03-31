const { Todos } = require('../models')

const authorization = ((req, res, next) => {
  const id = Number(req.params.id)
  Todos.findOne({ where: { id } })
    .then(result => {
      if (result) {
        if (result.userId == req.dataUser.id) {
          next()
        } else {
          throw { status: 403, msg: 'not authorized!' }
        }
      } else {
        throw { status: 404, msg: 'not found!' }
      }
    })
    .catch(err => {
      next(err)
    })
})

module.exports = authorization