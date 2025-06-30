'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get Finn's coachId using his email
    const [coach] = await queryInterface.sequelize.query(
      "SELECT coachId FROM Coaches WHERE coachEmail = 'finn.hero@example.com'",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!coach) throw new Error('Coach Finn not found');
    const coachId = coach.coachId;

    // Monday-Friday availability (9 AM - 5 PM)
    const operatingHours = Array.from({ length: 5 }, (_, day) => ({
      coachId,
      isOpen: true,
      weekDay: day, // 0=Monday, 4=Friday
      openTime: '09:00:00',
      closeTime: '17:00:00'
    }));

    return queryInterface.bulkInsert(
      { tableName: 'OperatingHours'},
      operatingHours
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Get Finn's coachId
    const [coach] = await queryInterface.sequelize.query(
      "SELECT coachId FROM Coaches WHERE coachEmail = 'finn.hero@example.com'",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (coach) {
      return queryInterface.bulkDelete(
        { tableName: 'OperatingHours'},
        { coachId: coach.coachId }
      );
    }
  }
};
