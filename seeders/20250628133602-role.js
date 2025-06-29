'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert example roles
    await queryInterface.bulkInsert('Roles', [
      { roleName: 'admin' },
      { roleName: 'coach' },
      { roleName: 'client' },
      { roleName: 'manager' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted roles by name
    await queryInterface.bulkDelete('Roles', {
      roleName: ['admin', 'coach', 'client', 'manager']
    });
  }
};
