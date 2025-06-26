'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Specializations',
      {
        specializationId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        specializationName: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true
        },
        specializationDescription: {
          type: Sequelize.STRING(255),
          allowNull: false
        }
      },
      {
        schema: 'CoollaCalendar'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: 'Specializations',
      schema: 'CoollaCalendar'
    });
  }
};
