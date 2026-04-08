// Sesuaikan export ini dengan inisialisasi model Sequelize di project Anda.
// File ini dibuat agar controller dashboard memiliki sumber model yang jelas.

const TenagaAhli = require('./tenagaAhli');
const Pengalaman = require('./pengalaman');

module.exports = {
  TenagaAhli,
  Pengalaman,
};
