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
      {
        schema: 'CoollaCalendar'
      }
    );

    // Add unique index on (coachId, weekDay)
    await queryInterface.addIndex(
      { tableName: 'OperatingHours', schema: 'CoollaCalendar' },
      ['coachId', 'weekDay'],
      {
        unique: true,
        name: 'unique_coach_weekday'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: 'OperatingHours',
      schema: 'CoollaCalendar'
    });
  }
};
