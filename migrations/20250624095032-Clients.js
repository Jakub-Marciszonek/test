'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      clientId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', // referenced table
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'organizationsId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      clientStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
      },
      clientName: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      clientSurname: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      clientAge: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      clientPhone: {
        type: Sequelize.STRING(16),
        allowNull: true,
        unique: true
      },
      clientEmail: {
        type: Sequelize.STRING(45),
        allowNull: true,
        unique: true
      },
      clientDescription: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      clientSex: {
        type: Sequelize.ENUM('Female', 'Male', 'Other'),
        allowNull: true
      },
      clientAttachments: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      clientLimit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      clientBalance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  }
};
