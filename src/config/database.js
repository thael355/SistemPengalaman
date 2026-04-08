const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI || 'mysql://root:root@localhost:3306/sistem_pengalaman', {
  logging: false,
});

module.exports = sequelize;
