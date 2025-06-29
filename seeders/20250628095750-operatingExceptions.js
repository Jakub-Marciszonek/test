'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Find Finn's coachId using his email (no double quotes)
    const [coaches] = await queryInterface.sequelize.query(
      `SELECT coachId FROM Coaches WHERE coachEmail = 'finn.hero@example.com'`
    );

    if (!coaches.length) throw new Error('Coach Finn not found');
    const coachId = coaches[0].coachId;

    // Create some exception days for Finn
    const exceptions = [
      {
        coachId,
        exceptionDate: '2025-12-25', // Christmas
        isOpen: false,
        openTime: '00:00:00',
        closeTime: '00:00:00',
        exceptionDescription: 'Closed for holiday'
      },
      {
        coachId,
        exceptionDate: '2025-07-10', // Short day
        isOpen: true,
        openTime: '10:00:00',
        closeTime: '14:00:00',
        exceptionDescription: 'Short day due to event'
      },
      {
        coachId,
        exceptionDate: '2025-07-15', // Open later
        isOpen: true,
        openTime: '12:00:00',
        closeTime: '17:00:00',
        exceptionDescription: 'Open later for personal reasons'
      }
    ];

    await queryInterface.bulkInsert('OperatingExceptions', exceptions);
  },

  down: async (queryInterface, Sequelize) => {
    // Find Finn's coachId
    const [coaches] = await queryInterface.sequelize.query(
      `SELECT coachId FROM Coaches WHERE coachEmail = 'finn.hero@example.com'`
    );

    if (coaches.length) {
      await queryInterface.bulkDelete('OperatingExceptions', {
        coachId: coaches[0].coachId,
        exceptionDate: ['2025-12-25', '2025-07-10', '2025-07-15']
      });
    }
  }
};
