const { fn, col, literal } = require('sequelize');
const { TenagaAhli, Pengalaman } = require('../models');

async function getDashboard(req, res, next) {
  try {
    const [totalTenagaAhli, totalPengalaman, pengalamanPerBulan] = await Promise.all([
      TenagaAhli.count(),
      Pengalaman.count(),
      Pengalaman.findAll({
        attributes: [
          [fn('DATE_FORMAT', col('tanggal_mulai'), '%Y-%m'), 'bulan'],
          [fn('COUNT', col('id')), 'jumlah_pengalaman'],
        ],
        group: [literal("DATE_FORMAT(tanggal_mulai, '%Y-%m')")],
        order: [[literal("DATE_FORMAT(tanggal_mulai, '%Y-%m')"), 'ASC']],
        raw: true,
      }),
    ]);

    return res.status(200).json({
      data: {
        total_tenaga_ahli: totalTenagaAhli,
        total_pengalaman: totalPengalaman,
        pengalaman_per_bulan: pengalamanPerBulan.map((item) => ({
          bulan: item.bulan,
          jumlah_pengalaman: Number(item.jumlah_pengalaman),
        })),
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getDashboard,
};
