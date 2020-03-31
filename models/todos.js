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
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "date tidak boleh kosong!"
        },
        notNull: {
          msg: "date tidak boleh kosong!"
        },
        isDate: {
          msg: "Date is date!"
        }
      }
    }
  }, { sequelize });

  // const Todos = sequelize.define('Todos', {
  // })

  Todos.associate = function (models) {
    // associations can be defined here
    Todos.belongsTo(models.Users, { foreignKey: 'userId' })
  };
  return Todos;
};