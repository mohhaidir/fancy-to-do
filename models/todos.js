'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'desciption tidak boleh kosong'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'status tidak boleh kosong'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'date tidak boleh kosong'
        }
      }
    }
  }, { sequelize });
  Todos.associate = function (models) {
    // associations can be defined here
  };
  return Todos;
};