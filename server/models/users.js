'use strict';
const hassPassword = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Users extends Model { }

  Users.init({
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hassPassword(instance.password)
        console.log(instance.password)
      }
    }, sequelize
  });

  // const Users = sequelize.define('Users', {
  // })

  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Todos, { foreignKey: 'userId' })
  };
  return Users;
};