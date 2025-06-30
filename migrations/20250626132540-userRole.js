'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UserRole',
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'userId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        userType: {
          type: Sequelize.ENUM('Coach', 'Client', 'Organization'),
          primaryKey: true,
          allowNull: false
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Roles',
            key: 'roleId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        assigmentTime: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserRole');
  }
};
