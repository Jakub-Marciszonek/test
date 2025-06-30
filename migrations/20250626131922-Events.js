'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Events', 
      {
      eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // referenced table
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      coachId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Coaches',
          key: 'coachId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'serviceId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      eventName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      eventDescription: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      eventNote: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      eventDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      eventAttendance: {
        type: Sequelize.ENUM('Present', 'Not present'),
        allowNull: true,
        defaultValue: 'Present'
      },
      eventAttachments: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      eventLocation: {
        type: Sequelize.ENUM('On-site', 'Online'),
        allowNull: false,
        defaultValue: 'On-site'
      },
      eventCreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};
