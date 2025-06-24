'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Services', [
      {
        serviceName: 'Personal Training',
        serviceDescription: 'One-on-one fitness training sessions.'
      },
      {
        serviceName: 'Nutrition Consultation',
        serviceDescription: 'Personalized nutrition and diet planning.'
      },
      {
        serviceName: 'Group Fitness',
        serviceDescription: 'Group exercise classes for all levels.'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded services by name
    await queryInterface.bulkDelete('Services', {
      serviceName: [
        'Personal Training',
        'Nutrition Consultation',
        'Group Fitness'
      ]
    }, {});
  }
};
