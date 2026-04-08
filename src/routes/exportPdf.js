const express = require("express");
const PDFDocument = require("pdfkit");
const {
  findTenagaAhliById,
  findPengalamanByTenagaAhliId
} = require("../data/mockData");

const router = express.Router();

router.get("/api/export/pdf/:tenaga_ahli_id", (req, res) => {
  const { tenaga_ahli_id: tenagaAhliId } = req.params;
  const tenagaAhli = findTenagaAhliById(tenagaAhliId);

  if (!tenagaAhli) {
    return res.status(404).json({
      message: "Tenaga ahli tidak ditemukan"
    });
  }

  const listPengalaman = findPengalamanByTenagaAhliId(tenagaAhliId);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=export-pengalaman-${tenagaAhliId}.pdf`
  );

  const doc = new PDFDocument({ margin: 40, size: "A4" });
  doc.pipe(res);

  doc.fontSize(18).text("Export Pengalaman Tenaga Ahli", { align: "center" });
  doc.moveDown();

  doc.fontSize(13).text("Data Tenaga Ahli", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11).text(`ID: ${tenagaAhli.id}`);
  doc.text(`Nama: ${tenagaAhli.nama}`);
  doc.text(`Keahlian: ${tenagaAhli.keahlian}`);
  doc.text(`Email: ${tenagaAhli.email}`);
  doc.moveDown();

  doc.fontSize(13).text("List Pengalaman", { underline: true });
  doc.moveDown(0.5);

  if (listPengalaman.length === 0) {
    doc.fontSize(11).text("Belum ada data pengalaman.");
  } else {
    listPengalaman.forEach((item, index) => {
      doc
        .fontSize(11)
        .text(`${index + 1}. ${item.proyek}`)
        .text(`   Peran: ${item.peran}`)
        .text(`   Tahun: ${item.tahun}`)
        .moveDown(0.5);
    });
  }

  doc.end();

  return undefined;
});

module.exports = router;
