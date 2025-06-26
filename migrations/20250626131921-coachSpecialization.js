'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'CoachSpecialization',
      {
        coachId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Coaches',
            key: 'coachId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        specializationId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Specializations',
            key: 'specializationId'
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
      tableName: 'CoachSpecialization',
      schema: 'CoollaCalendar'
    });
  }
};
