const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CoachSpecialization extends Model {}

  CoachSpecialization.init({
    coachId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Coaches',
        key: 'coachId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    specializationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Specializations',
        key: 'specializationId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  }, {
    sequelize,
    modelName: 'CoachSpecialization',
    tableName: 'CoachSpecializations',
    schema: 'CoollaCalendar',
    timestamps: false
  });

  return CoachSpecialization;
};
