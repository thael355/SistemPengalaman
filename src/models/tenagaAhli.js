const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TenagaAhli = sequelize.define(
  'TenagaAhli',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tenaga_ahli',
    timestamps: false,
  }
);

module.exports = TenagaAhli;
