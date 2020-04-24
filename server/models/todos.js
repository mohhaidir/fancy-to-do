'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Todos extends Model { }

  Todos.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title'
        },
        notNull: {
          msg: 'title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description'
        },
        notNull: {
          msg: 'description'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "date"
        },
        notNull: {
          msg: "date"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (todos, option) => {
        todos.status = 'Uncomplete';
      }
    }
  });

  Todos.associate = function (models) {
    // associations can be defined here
    Todos.belongsTo(models.Users, { foreignKey: 'userId' })
  };
  return Todos;
};