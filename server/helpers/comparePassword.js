const bcrypt = require('bcrypt');

const comparePassword = (inputPassword, userPassword) => {
  return bcrypt.compare(inputPassword, userPassword)
}

module.exports = comparePassword