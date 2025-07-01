'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get coach IDs for the coaches you want to assign exceptions to
    const coaches = await queryInterface.sequelize.query(
      `SELECT coachId, coachEmail FROM Coaches WHERE coachEmail IN ('finn.hero@example.com', 'bob.johnson@example.com')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (coaches.length < 2) {
      throw new Error('Required coaches not found for seeding OperatingExceptions');
    }

    const finn = coaches.find(c => c.coachEmail === 'finn.hero@example.com');
    const bob = coaches.find(c => c.coachEmail === 'bob.johnson@example.com');

    // Prepare seed data for OperatingExceptions
    const exceptions = [
      {
        coachId: bob.coachId,
        exceptionDate: '2025-12-25', // Christmas
        isOpen: false,
        openTime: '00:00:00',
        closeTime: '00:00:00',
        recurrenceType: 'yearly',
        exceptionDescription: 'Christmas Day - Closed'
      },
      {
        coachId: finn.coachId,
        exceptionDate: '2025-07-05',
        isOpen: true,
        openTime: '10:00:00',
        closeTime: '14:00:00',
        exceptionDescription: 'Shortened hours on July 5th'
      }
    ];

    // Insert seed data
    await queryInterface.bulkInsert('OperatingExceptions', exceptions);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seeded exceptions by description or dates
    await queryInterface.bulkDelete('OperatingExceptions', {
      exceptionDescription: [
        'Independence Day - Closed',
        'Christmas Day - Closed',
        'Shortened hours on July 5th'
      ]
    });
  }
};
