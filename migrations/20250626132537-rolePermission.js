'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'RolePermission',
      {
        roleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Roles',
            key: 'roleId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        perrmissionId: { // Use 'permissionId' if you have fixed the typo in your schema
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Permissions',
            key: 'perrmissionId' // Use 'permissionId' if typo is fixed
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      },
      {
        schema: 'CoollaCalendar'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: 'RolePermission',
      schema: 'CoollaCalendar'
    });
  }
};
