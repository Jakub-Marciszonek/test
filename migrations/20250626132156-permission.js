'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Permissions',
      {
        perrmissionId: { // Typo matches your schema if present
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        permissionName: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true
        }
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  }
};
