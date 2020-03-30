'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title tidak boleh kosong'
        },
        notNull: {
          msg: 'title tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'desciption tidak boleh kosong'
        },
        notNull: {
          msg: 'desciption tidak boleh kosong'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'status tidak boleh kosong'
        },
        notNull: {
          msg: 'status tidak boleh kosong'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'date tidak boleh kosong'
        },
        notNull: {
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