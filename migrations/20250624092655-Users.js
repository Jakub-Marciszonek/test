'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userType: {
        type: Sequelize.ENUM('Coach', 'Client', 'Organization'),
        allowNull: false
      },
      userCreatedAt: {
        type: Sequelize.DATE, // Maps to TIMESTAMP in MySQL
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
