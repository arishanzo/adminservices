export function totalPerTahun(data) {
  const groupedByYear = {};

  data.forEach((item) => {
    const tgl = new Date(item.tanggal);
    const tahun = tgl.getFullYear();

    if (!groupedByYear[tahun]) {
      groupedByYear[tahun] = { pemasukan: 0, pengeluaran: 0 };
    }

    
    groupedByYear[tahun].pengeluaran += item.penarikan || 0;
    groupedByYear[tahun].pemasukan += item.pemasukan || 0;

  });


  return Object.keys(groupedByYear).map((tahun) => ({
       name: tahun, 
       pemasukan: groupedByYear[tahun].pemasukan, 
       pengeluaran: groupedByYear[tahun].pengeluaran
  }));
}
