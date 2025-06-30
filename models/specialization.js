const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Specialization extends Model {}

  Specialization.init({
    specializationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    specializationName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true
    },
    specializationDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Specialization',
    tableName: 'Specializations',
    timestamps: false
  });

  return Specialization;
};
