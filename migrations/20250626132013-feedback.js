'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Feedback',
      {
        feedbackId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'userId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        feedbackType: {
          type: Sequelize.ENUM('Calendart', 'Service'), // Matches your schema
          allowNull: false
        },
        feedbackContent: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        feedbackTimeStamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Feedback');
  }
};
