const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserRole extends Model {}

  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    userType: {
      type: DataTypes.ENUM('Coach', 'Client', 'Organization'),
      primaryKey: true,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'roleId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    assigmentTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'UserRole',
    timestamps: false
  });

  return UserRole;
};
