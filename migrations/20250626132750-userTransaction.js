'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UserTransactions',
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'userId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        transactionId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Transactions',
            key: 'transactionId'
          },
          onDelete: 'RESTRICT',
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
      tableName: 'UserTransactions',
      schema: 'CoollaCalendar'
    });
  }
};
