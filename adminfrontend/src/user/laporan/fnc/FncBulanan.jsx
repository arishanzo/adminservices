

export function TotalBulanan(data) {

  const namaBulan = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];

  
  const now = new Date();
  const tahunSekarang = now.getFullYear();

  const groupedByMonth = {};

  data?.forEach((item) => {
    const tgl = new Date(item.tanggal);
    const bulan = tgl.getMonth(); // 0-11

  if(tgl.getFullYear() !== tahunSekarang) return

    if (!groupedByMonth[bulan]) {

      groupedByMonth[bulan] = { pemasukan: 0, pengeluaran: 0 };

    } 

 if(tgl.getFullYear() === tahunSekarang){
    groupedByMonth[bulan].pemasukan += item.pemasukan || 0;
    groupedByMonth[bulan].pengeluaran += item.penarikan || 0;
    }

    
  });

  return Object.keys(groupedByMonth).map((bulan) => ({
       name: `${namaBulan[bulan]} ${tahunSekarang}`, 
       pemasukan: groupedByMonth[bulan].pemasukan, 
       pengeluaran: groupedByMonth[bulan].pengeluaran
  }));
}
