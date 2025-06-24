'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [
      {
        clientId: 1, // Must match an existing userId in Users table
        coachId: 1,  // Must match an existing coachId in Coaches table
        serviceId: 1, // Must match an existing serviceId in Services table
        eventName: 'Kickoff Meeting',
        eventDescription: 'Initial project kickoff with client and coach.',
        eventNote: 'Bring all project documents.',
        eventDate: '2025-07-01',
        startTime: '10:00:00',
        endTime: '11:00:00',
        eventAttendance: 'Present',
        eventAttachments: null,
        eventLocation: 'On-site',
        eventCreatedAt: new Date()
      },
      {
        clientId: 2,
        coachId: 1,
        serviceId: 2,
        eventName: 'Nutrition Consultation',
        eventDescription: 'Discuss dietary plans.',
        eventNote: null,
        eventDate: '2025-07-02',
        startTime: '14:00:00',
        endTime: '15:00:00',
        eventAttendance: 'Not present',
        eventAttachments: null,
        eventLocation: 'Online',
        eventCreatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', {
      eventName: ['Kickoff Meeting', 'Nutrition Consultation']
    }, {});
  }
};
