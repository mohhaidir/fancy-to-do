'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Users extends Model { }

  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize });

  // const Users = sequelize.define('Users', {
  // })

  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Todos, { foreignKey: 'userId' })
  };
  return Users;
};