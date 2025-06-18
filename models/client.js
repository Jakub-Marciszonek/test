const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Client extends Model {}

  Client.init({
    cleintId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users', // table name
        key: 'userId'
      }
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Organizations', // table name
        key: 'organizationsId'
      }
    },
    clientStatus: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    clientName: {
        type: DataTypes.STRING(45),// in DB its VARCHAR
        allowNull: false
    },
    clientSurname: {
        type: DataTypes.STRING(45),// in DB its VARCHAR
        allowNull: true
    },
    clientAge: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    clientPhone: {
        type: DataTypes.STRING(16),// in DB its VARCHAR
        allowNull: true,
        unique: true, // Ensure phone number is unique
    },
    clientEmail: {
        type: DataTypes.STRING(45),// in DB its VARCHAR
        allowNull: true,
        unique: true, // Ensure email is unique
        validate: {
            isEmail: true // Validate email format
        }
    },
    clientDescription: {
        type: DataTypes.STRING(255),// in DB its VARCHAR
        allowNull: true
    },
    clientSex: {
        type: DataTypes.ENUM('Female', 'Male', 'Other'),
        allowNull: true,
    },
    clientAtachments: {
        type: DataTypes.STRING(255),// in DB its VARCHAR
        allowNull: true
    },
    clientLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    clientBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients',
    timestamps: false
  });

  return Client;
}