const sequelize = require('./database');

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil.');
  } catch (error) {
    console.error('❌ Koneksi database gagal:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

testDatabaseConnection();
