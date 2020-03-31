require = ('dotenv').config
const jwt = require('jsonwebtoken')

const generateToken = (data) => {
  const token = jwt.sign({
    id: data.id,
    username: data.username,
    email: data.email
  }, process.env.JWT_TOKEN)
  return token
}

module.exports = generateToken