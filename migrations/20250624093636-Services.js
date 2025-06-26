'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Services', 
      {
      serviceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      serviceName: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      serviceDescription: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Services');
  }
};
