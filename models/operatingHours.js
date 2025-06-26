const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OperatingHours extends Model {}

  OperatingHours.init({
    hoursId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coaches', // table name as string
        key: 'coachId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    weekDay: {
      type: DataTypes.TINYINT,
      allowNull: false
      // 0 = Monday, 6 = Sunday (document your convention)
    },
    openTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'OperatingHours',
    tableName: 'OperatingHours',
    schema: 'CoollaCalendar',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['coachId', 'weekDay']
      }
    ]
  });

  return OperatingHours;
};
