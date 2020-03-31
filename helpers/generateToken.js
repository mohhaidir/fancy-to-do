require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateToken(data) {
  const token = jwt.sign({
    id: data.id,
    username: data.username,
    email: data.email
  }, 'kepo')
  return token
}

module.exports = generateToken