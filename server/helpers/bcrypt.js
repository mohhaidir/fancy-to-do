const bcrypt = require('bcrypt')

const hashPassword = (str) => {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(str, salt)
  return hash;
}

module.exports = hashPassword;