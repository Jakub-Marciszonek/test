'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      organizationsId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', // referenced table name
          key: 'userId'   // referenced column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      organizationName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      organizationEmail: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      organizationPhone: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      prefferedContact: {
        type: Sequelize.ENUM('Email', 'Phone'),
        allowNull: true
      },
      organizationAdress: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Organizations');
  }
};
