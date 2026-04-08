const dotenv = require('dotenv');
const app = require('./src/app');
const sequelize = require('./src/config/database');

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database terhubung.');

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal menghubungkan database:', error.message);
    process.exit(1);
  }
}

startServer();
