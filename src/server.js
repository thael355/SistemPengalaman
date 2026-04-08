const express = require("express");
const exportPdfRouter = require("./routes/exportPdf");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(exportPdfRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
