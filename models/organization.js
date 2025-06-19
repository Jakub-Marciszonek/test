const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Organization extends Model {}

  Organization.init({
    organizationsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    organizationName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    organizationEmail: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    organizationPhone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    prefferedContact: {
      type: DataTypes.ENUM('Email', 'Phone'),
      allowNull: true
    },
    organizationAdress: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Organization',
    tableName: 'Organizations',
    timestamps: false
  });

  return Organization;
};
