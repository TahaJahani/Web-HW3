'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Note.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    color: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Note',
  });

  Note.belongsTo(User)
  return Note;
};