const bcrypt = require('bcrypt');

const comparePassword = (inputPassword, userPassword) => {
  return bcrypt.compareSync(inputPassword, userPassword)
}

module.exports = comparePassword