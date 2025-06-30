'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert some example permissions (adjust as needed)
    await queryInterface.bulkInsert('Permissions', [
      { permissionName: 'view_users' },
      { permissionName: 'edit_users' },
      { permissionName: 'delete_users' },
      { permissionName: 'manage_roles' },
      { permissionName: 'access_reports' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted permissions by name
    await queryInterface.bulkDelete('Permissions', {
      permissionName: [
        'view_users',
        'edit_users',
        'delete_users',
        'manage_roles',
        'access_reports'
      ]
    });
  }
};
