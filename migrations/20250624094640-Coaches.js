'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Coaches', 
      {
      coachId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', // referenced table
          key: 'userId'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE'
      },
      coachName: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      coachSurname: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      coachPhone: {
        type: Sequelize.STRING(16),
        allowNull: true,
        unique: true
      },
      coachEmail: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coaches');
  }
};
