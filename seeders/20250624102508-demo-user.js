'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert users in a known order
    await queryInterface.bulkInsert('Users', [
      { userType: 'Client', userCreatedAt: new Date() },        // userId: 1
      { userType: 'Client', userCreatedAt: new Date() },        // userId: 2
      { userType: 'Coach', userCreatedAt: new Date() },         // userId: 3
      { userType: 'Coach', userCreatedAt: new Date() },         // userId: 4
      { userType: 'Organization', userCreatedAt: new Date() },  // userId: 5
      { userType: 'Organization', userCreatedAt: new Date() }   // userId: 6
    ]);

    // Organizations: use userId 5 and 6
    await queryInterface.bulkInsert('Organizations', [
      {
        organizationsId: 5,
        organizationName: 'Doofenshmirtz Evil Inc',
        organizationEmail: 'Doofenshmirtz@acme.com',
        organizationPhone: '+1234567890',
        prefferedContact: 'Email',
        organizationAdress: 'Tri-State Area'
      },
      {
        organizationsId: 6,
        organizationName: 'Globex Inc',
        organizationEmail: 'info@globex.com',
        organizationPhone: '+1987654321',
        prefferedContact: 'Phone',
        organizationAdress: '456 Elm St'
      }
    ]);

    // Coaches: use userId 3 and 4
    await queryInterface.bulkInsert('Coaches', [
      {
        coachId: 3,
        coachName: 'Finn',
        coachSurname: 'The human',
        coachPhone: '+1111111111',
        coachEmail: 'finn.hero@example.com'
      },
      {
        coachId: 4,
        coachName: 'Bob',
        coachSurname: 'Johnson',
        coachPhone: '+1222222222',
        coachEmail: 'bob.johnson@example.com'
      }
    ]);

    // Clients: use userId 1 and 2, and organizationsId 5 and 6
    await queryInterface.bulkInsert('Clients', [
      {
        clientId: 1,
        organizationId: 5,
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
        clientId: 2,
        organizationId: 6,
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
      coachEmail: ['finn.hero@example.com', 'bob.johnson@example.com']
    }, {});

    // Remove organizations by name
    await queryInterface.bulkDelete('Organizations', {
      organizationName: ['Doofenshmirtz Evil Inc', 'Globex Inc']
    }, {});

    // Remove all users of these types (since only seed data is present)
    await queryInterface.bulkDelete('Users', {
      userType: ['Client', 'Coach', 'Organization']
    }, {});
  }
};
