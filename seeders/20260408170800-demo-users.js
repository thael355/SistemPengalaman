'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Admin Sistem',
        email: 'admin@sistem-pengalaman.local',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Budi User',
        email: 'budi@sistem-pengalaman.local',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {
      id: [1, 2]
    });
  }
};
