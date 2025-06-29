const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OperatingHours extends Model {}

  OperatingHours.init({
    hoursId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Coaches',
          schema: 'CoollaCalendar',
        },
        key: 'coachId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    weekDay: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    openTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'OperatingHours',
    tableName: 'OperatingHours',
    schema: 'CoollaCalendar',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['coachId', 'weekDay'],
        name: 'unique_coach_weekday',
      },
      {
        fields: ['coachId'],
        name: 'coachId_idx',
      },
    ],
  });

  return OperatingHours;
};
