'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get a serviceId (use the first available service)
    const [services] = await queryInterface.sequelize.query(
      `SELECT serviceId FROM Services LIMIT 1`
    );
    if (!services.length) throw new Error('No services found');
    const serviceId = services[0].serviceId;

    // Insert a transaction
    await queryInterface.bulkInsert('Transactions', [
      {
        serviceId,
        transactionName: 'Initial Consultation',
        transactionDescription: 'First session consultation fee',
        transactionTimestamp: new Date()
      }
    ]);

    // Get the transactionId for the inserted transaction
    const [transactions] = await queryInterface.sequelize.query(
      `SELECT transactionId FROM Transactions WHERE transactionName = 'Initial Consultation'`
    );
    if (!transactions.length) throw new Error('Transaction not found');
    const transactionId = transactions[0].transactionId;

    // Get Finn's userId (or any user you want to link)
    const [users] = await queryInterface.sequelize.query(
      `SELECT userId FROM Users WHERE userType = 'Coach' OR userType = 'Client' LIMIT 1`
    );
    if (!users.length) throw new Error('User not found');
    const userId = users[0].userId;

    // Link the user to the transaction
    await queryInterface.bulkInsert('UserTransactions', [
      {
        userId,
        transactionId
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Get the transactionId for 'Initial Consultation'
    const [transactions] = await queryInterface.sequelize.query(
      `SELECT transactionId FROM Transactions WHERE transactionName = 'Initial Consultation'`
    );
    if (!transactions.length) return;
    const transactionId = transactions[0].transactionId;

    // Remove from UserTransactions
    await queryInterface.bulkDelete('UserTransactions', {
      transactionId
    });

    // Remove the transaction itself
    await queryInterface.bulkDelete('Transactions', {
      transactionName: 'Initial Consultation'
    });
  }
};
