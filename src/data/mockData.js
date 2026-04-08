const tenagaAhli = [
  {
    id: "1",
    nama: "Andi Pratama",
    keahlian: "Teknik Sipil",
    email: "andi.pratama@example.com"
  },
  {
    id: "2",
    nama: "Siti Rahma",
    keahlian: "Manajemen Proyek",
    email: "siti.rahma@example.com"
  }
];

const pengalaman = [
  {
    tenagaAhliId: "1",
    proyek: "Pembangunan Jembatan Kota",
    peran: "Site Engineer",
    tahun: 2022
  },
  {
    tenagaAhliId: "1",
    proyek: "Renovasi Gedung Pemerintah",
    peran: "Supervisor Struktur",
    tahun: 2024
  },
  {
    tenagaAhliId: "2",
    proyek: "Implementasi PMO Nasional",
    peran: "Project Manager",
    tahun: 2023
  }
];

function findTenagaAhliById(id) {
  return tenagaAhli.find((item) => item.id === id);
}

function findPengalamanByTenagaAhliId(id) {
  return pengalaman.filter((item) => item.tenagaAhliId === id);
}

module.exports = {
  findTenagaAhliById,
  findPengalamanByTenagaAhliId
};
