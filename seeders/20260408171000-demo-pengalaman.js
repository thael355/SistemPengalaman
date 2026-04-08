'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Pengalamans', [
      {
        id: 1,
        tenagaAhliId: 1,
        instansi: 'PT Nusantara Teknologi',
        posisi: 'Project Manager',
        tahunMulai: 2019,
        tahunSelesai: 2022,
        deskripsi: 'Memimpin implementasi ERP multi-cabang.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        tenagaAhliId: 2,
        instansi: 'CV Digital Solusi',
        posisi: 'Fullstack Developer',
        tahunMulai: 2020,
        tahunSelesai: null,
        deskripsi: 'Membangun dan memelihara aplikasi web internal.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Pengalamans', {
      id: [1, 2]
    });
  }
};
