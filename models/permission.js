const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Permission extends Model {}

  Permission.init({
    perrmissionId: { // Typo matches your schema!
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    permissionName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'Permissions',
    schema: 'CoollaCalendar',
    timestamps: false
  });

  return Permission;
};
