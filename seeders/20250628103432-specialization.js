const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert specializations
    await queryInterface.bulkInsert('Specializations', [
      { specializationName: 'Mindfulness', specializationDescription: 'Coaching focused on mindfulness and meditation.' },
      { specializationName: 'Fitness', specializationDescription: 'Coaching focused on physical fitness and training.' }
    ]);

    // Get specialization IDs
    const specRows = await queryInterface.sequelize.query(
      `SELECT specializationId, specializationName FROM Specializations WHERE specializationName IN ('Mindfulness', 'Fitness')`,
      { type: QueryTypes.SELECT }
    );
    if (specRows.length !== 2) throw new Error('Specializations not found');
    const mindfulness = specRows.find(s => s.specializationName === 'Mindfulness');
    const fitness = specRows.find(s => s.specializationName === 'Fitness');

    // Get coaches
    const coaches = await queryInterface.sequelize.query(
      `SELECT coachId, coachEmail FROM Coaches WHERE coachEmail IN ('finn.hero@example.com', 'bob.johnson@example.com')`,
      { type: QueryTypes.SELECT }
    );
    if (coaches.length !== 2) throw new Error('One or both coaches not found');
    const finn = coaches.find(c => c.coachEmail === 'finn.hero@example.com');
    const bob = coaches.find(c => c.coachEmail === 'bob.johnson@example.com');

    // Insert into CoachSpecializations (verify exact table name)
    await queryInterface.bulkInsert('CoachSpecialization', [
      { coachId: finn.coachId, specializationId: mindfulness.specializationId },
      { coachId: bob.coachId, specializationId: fitness.specializationId }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const specRows = await queryInterface.sequelize.query(
      `SELECT specializationId FROM Specializations WHERE specializationName IN ('Mindfulness', 'Fitness')`,
      { type: QueryTypes.SELECT }
    );
    const specIds = specRows.map(s => s.specializationId);

    const coaches = await queryInterface.sequelize.query(
      `SELECT coachId FROM Coaches WHERE coachEmail IN ('finn.hero@example.com', 'bob.johnson@example.com')`,
      { type: QueryTypes.SELECT }
    );
    const coachIds = coaches.map(c => c.coachId);

    // Delete exact pairs
    for (const coachId of coachIds) {
      for (const specId of specIds) {
        await queryInterface.bulkDelete('CoachSpecializations', {
          coachId,
          specializationId: specId
        });
      }
    }

    // Delete specializations
    await queryInterface.bulkDelete('Specializations', {
      specializationName: ['Mindfulness', 'Fitness']
    });
  }
};
