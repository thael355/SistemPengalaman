'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pengalaman extends Model {
    static associate(models) {
      Pengalaman.belongsTo(models.TenagaAhli, {
        foreignKey: 'tenagaAhliId',
        as: 'tenagaAhli'
      });
    }
  }

  Pengalaman.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tenagaAhliId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      instansi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      posisi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tahunMulai: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tahunSelesai: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Pengalaman',
      tableName: 'Pengalamans',
      timestamps: true
    }
  );

  return Pengalaman;
};
