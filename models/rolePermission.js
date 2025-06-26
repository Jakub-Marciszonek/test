const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RolePermission extends Model {}

  RolePermission.init({
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Roles',
        key: 'roleId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    perrmissionId: { // Typo matches your schema!
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Permissions',
        key: 'perrmissionId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'RolePermission',
    schema: 'CoollaCalendar',
    timestamps: false
  });

  return RolePermission;
};
