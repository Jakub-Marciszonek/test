'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'OperatingHours',
      {
        hoursId: {
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
        isOpen: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        weekDay: {
          type: Sequelize.TINYINT,
          allowNull: false
        },
        openTime: {
          type: Sequelize.TIME,
          allowNull: true
        },
        closeTime: {
          type: Sequelize.TIME,
          allowNull: true
        }
      },
    );

    // Add unique index on (coachId, weekDay)
    await queryInterface.addIndex(
      'OperatingHours',
      ['coachId', 'weekDay'],
      {
        unique: true,
        name: 'unique_coach_weekday'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OperatingHours');
  }
};
