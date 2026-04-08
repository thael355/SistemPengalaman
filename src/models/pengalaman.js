const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pengalaman = sequelize.define(
  'Pengalaman',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    tenaga_ahli_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'pengalaman',
    timestamps: false,
  }
);

module.exports = Pengalaman;
