'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Insert two specializations
    await queryInterface.bulkInsert('Specializations', [
      {
        specializationName: 'Mindfulness',
        specializationDescription: 'Coaching focused on mindfulness and meditation.'
      },
      {
        specializationName: 'Fitness',
        specializationDescription: 'Coaching focused on physical fitness and training.'
      }
    ]);

    // 2. Get specialization IDs
    const [specRows] = await queryInterface.sequelize.query(
      `SELECT specializationId, specializationName FROM Specializations WHERE specializationName IN ('Mindfulness', 'Fitness')`
    );
    if (specRows.length !== 2) throw new Error('Specializations not found');
    const mindfulness = specRows.find(s => s.specializationName === 'Mindfulness');
    const fitness = specRows.find(s => s.specializationName === 'Fitness');

    // 3. Get both coaches' IDs
    const [coaches] = await queryInterface.sequelize.query(
      `SELECT coachId, coachEmail FROM Coaches WHERE coachEmail IN ('finn.hero@example.com', 'bob.johnson@example.com')`
    );
    if (coaches.length !== 2) throw new Error('One or both coaches not found');
    const finn = coaches.find(c => c.coachEmail === 'finn.hero@example.com');
    const bob = coaches.find(c => c.coachEmail === 'bob.johnson@example.com');

    // 4. Link each coach to their specialization
    await queryInterface.bulkInsert('CoachSpecializations', [
      {
        coachId: finn.coachId,
        specializationId: mindfulness.specializationId
      },
      {
        coachId: bob.coachId,
        specializationId: fitness.specializationId
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Get specialization IDs
    const [specRows] = await queryInterface.sequelize.query(
      `SELECT specializationId FROM Specializations WHERE specializationName IN ('Mindfulness', 'Fitness')`
    );
    const specIds = specRows.map(s => s.specializationId);

    // 2. Get both coaches' IDs
    const [coaches] = await queryInterface.sequelize.query(
      `SELECT coachId FROM Coaches WHERE coachEmail IN ('finn.hero@example.com', 'bob.johnson@example.com')`
    );
    const coachIds = coaches.map(c => c.coachId);

    // 3. Remove links from CoachSpecializations
    await queryInterface.bulkDelete('CoachSpecializations', {
      coachId: coachIds,
      specializationId: specIds
    });

    // 4. Remove the specializations themselves
    await queryInterface.bulkDelete('Specializations', {
      specializationName: ['Mindfulness', 'Fitness']
    });
  }
};
