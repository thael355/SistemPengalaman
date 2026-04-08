'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('TenagaAhlis', [
      {
        id: 1,
        userId: 1,
        nama: 'Andi Pratama',
        bidangKeahlian: 'Manajemen Proyek IT',
        nomorTelepon: '081234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        nama: 'Siti Rahma',
        bidangKeahlian: 'Pengembangan Web',
        nomorTelepon: '081298765432',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TenagaAhlis', {
      id: [1, 2]
    });
  }
};
