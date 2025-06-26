'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create 6 users: 2 Clients, 2 Coaches, 2 Organizations
    const users = await queryInterface.bulkInsert('Users', [
      { userType: 'Client', userCreatedAt: new Date() },        // 1
      { userType: 'Client', userCreatedAt: new Date() },        // 2
      { userType: 'Coach', userCreatedAt: new Date() },         // 3
      { userType: 'Coach', userCreatedAt: new Date() },         // 4
      { userType: 'Organization', userCreatedAt: new Date() },  // 5
      { userType: 'Organization', userCreatedAt: new Date() }   // 6
    ], { returning: true });

    // Map users by type
    const clientUsers = users.filter(u => u.userType === 'Client');
    const coachUsers = users.filter(u => u.userType === 'Coach');
    const orgUsers = users.filter(u => u.userType === 'Organization');

    // 2. Create 2 organizations (use orgUsers[0] and orgUsers[1])
    await queryInterface.bulkInsert('Organizations', [
      {
        organizationsId: orgUsers[0].userId,
        organizationName: 'Doofenshmirtz Evil Inc',
        organizationEmail: 'Doofenshmirtz@acme.com',
        organizationPhone: '+1234567890',
        prefferedContact: 'Email',
        organizationAdress: 'Tri-State Area'
      },
      {
        organizationsId: orgUsers[1].userId,
        organizationName: 'Globex Inc',
        organizationEmail: 'info@globex.com',
        organizationPhone: '+1987654321',
        prefferedContact: 'Phone',
        organizationAdress: '456 Elm St'
      }
    ]);

    // 3. Create 2 coaches (use coachUsers[0] and coachUsers[1])
    await queryInterface.bulkInsert('Coaches', [
      {
        coachId: coachUsers[0].userId,
        coachName: 'Finn',
        coachSurname: 'The human',
        coachPhone: '+1111111111',
        coachEmail: 'finn.hero@example.com'
      },
      {
        coachId: coachUsers[1].userId,
        coachName: 'Bob',
        coachSurname: 'Johnson',
        coachPhone: '+1222222222',
        coachEmail: 'bob.johnson@example.com'
      }
    ]);

    // 4. Create 2 clients (use clientUsers[0] and clientUsers[1])
    await queryInterface.bulkInsert('Clients', [
      {
        clientId: clientUsers[0].userId,
        organizationId: orgUsers[0].userId,
        clientStatus: 'Active',
        clientName: 'Charlie',
        clientSurname: 'Brown',
        clientAge: 28,
        clientPhone: '+1333333333',
        clientEmail: 'charlie.brown@example.com',
        clientDescription: 'Interested in wellness programs.',
        clientSex: 'Male',
        clientAttachments: null,
        clientLimit: 10,
        clientBalance: 100
      },
      {
        clientId: clientUsers[1].userId,
        organizationId: orgUsers[1].userId,
        clientStatus: 'Inactive',
        clientName: 'Dana',
        clientSurname: 'White',
        clientAge: 34,
        clientPhone: '+1444444444',
        clientEmail: 'dana.white@example.com',
        clientDescription: 'Prefers online sessions.',
        clientSex: 'Female',
        clientAttachments: null,
        clientLimit: 5,
        clientBalance: 0
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove clients by email
    await queryInterface.bulkDelete('Clients', {
      clientEmail: ['charlie.brown@example.com', 'dana.white@example.com']
    }, {});

    // Remove coaches by email
    await queryInterface.bulkDelete('Coaches', {
      coachEmail: ['alice.smith@example.com', 'bob.johnson@example.com']
    }, {});

    // Remove organizations by name
    await queryInterface.bulkDelete('Organizations', {
      organizationName: ['Acme Corp', 'Globex Inc']
    }, {});

    // Remove the 6 users (by userType, assuming these are the only ones of each type for this seeder)
    await queryInterface.bulkDelete('Users', {
      userType: ['Client', 'Coach', 'Organization']
    }, {});
  }
};
