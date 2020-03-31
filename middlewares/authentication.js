const jwt = require('jsonwebtoken')

const authentication = ((req, res, next) => {
  const { token } = req.headers
  console.log('MASOK BOSS')
  try {
    let decoded = jwt.verify(token, 'kepo')
    req.dataUser = decoded
    console.log(req.dataUser)
    next()
  } catch (err) {
    const error = { status: 401, msg: 'please login first!' }
    next(error)
  }
})

module.exports = authentication