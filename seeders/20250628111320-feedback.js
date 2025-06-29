'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get userIds for Finn (coach) and Charlie (client)
    const [users] = await queryInterface.sequelize.query(
      `SELECT userId, userType FROM Users WHERE userType IN ('Coach', 'Client') ORDER BY userId`
    );
    if (users.length < 2) throw new Error('Not enough users found');

    const coachUser = users.find(u => u.userType === 'Coach');
    const clientUser = users.find(u => u.userType === 'Client');

    // Prepare feedback entries
    const feedbacks = [
      {
        userId: coachUser.userId,
        feedbackType: 'Calendart',
        feedbackContent: 'The calendar view is very helpful!',
        feedbackTimeStamp: new Date()
      },
      {
        userId: clientUser.userId,
        feedbackType: 'Service',
        feedbackContent: 'Great service, very satisfied.',
        feedbackTimeStamp: new Date()
      }
    ];

    // Insert feedbacks
    await queryInterface.bulkInsert('Feedback', feedbacks);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the feedbacks by content (unique for this seed)
    await queryInterface.bulkDelete('Feedback', {
      feedbackContent: [
        'The calendar view is very helpful!',
        'Great service, very satisfied.'
      ]
    });
  }
};
