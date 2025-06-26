const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OperatingException extends Model {}

  OperatingException.init({
    exceptionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coaches', // Table name as string
        key: 'coachId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    exceptionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    openTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    exceptionDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'OperatingException',
    tableName: 'OperatingExceptions',
    schema: 'CoollaCalendar',
    timestamps: false
  });

  return OperatingException;
};
