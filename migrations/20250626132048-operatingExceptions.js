'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'OperatingExceptions',
      {
        exceptionId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        coachId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Coaches',
            key: 'coachId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        exceptionDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        isOpen: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        openTime: {
          type: Sequelize.TIME,
          allowNull: false
        },
        closeTime: {
          type: Sequelize.TIME,
          allowNull: false
        },
        recurrenceType: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        exceptionDescription: {
          type: Sequelize.STRING(255),
          allowNull: true
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OperatingExceptions');

  }
};
