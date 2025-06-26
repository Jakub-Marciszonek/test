const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {}

  Role.init({
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
    schema: 'CoollaCalendar',
    timestamps: false
  });

  return Role;
};
