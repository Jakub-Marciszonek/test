'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Transactions',
      {
        transactionId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        serviceId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Services',
            key: 'serviceId'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        transactionName: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        transactionDescription: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        transactionTimestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
