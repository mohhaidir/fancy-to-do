'use strict';

module.exports = (sequelize, DataTypes) => {
  const hassPassword = require('../helpers/bcrypt')
  const Model = sequelize.Sequelize.Model
  class Users extends Model { }

  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hassPassword(instance.password)
      }
    }, sequelize
  })

  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Todos, { foreignKey: 'userId' })
  }
  return Users
}