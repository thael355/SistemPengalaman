'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TenagaAhli extends Model {
    static associate(models) {
      TenagaAhli.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      TenagaAhli.hasMany(models.Pengalaman, {
        foreignKey: 'tenagaAhliId',
        as: 'pengalaman'
      });
    }
  }

  TenagaAhli.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bidangKeahlian: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nomorTelepon: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'TenagaAhli',
      tableName: 'TenagaAhlis',
      timestamps: true
    }
  );

  return TenagaAhli;
};
