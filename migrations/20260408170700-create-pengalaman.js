'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pengalamans', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      tenagaAhliId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'TenagaAhlis',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      instansi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      posisi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tahunMulai: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tahunSelesai: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Pengalamans');
  }
};
