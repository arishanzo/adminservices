import { getWeek } from "date-fns";

export function TotalMingguan(data) {

  
  const now = new Date();
  const bulanSekarang = now.getMonth();
  
    const tahunSekarang = now.getFullYear();
  

  const groupedByWeek = {};

  data?.forEach((item) => {
    const tgl = new Date(item.tanggal);
    const minggu = getWeek(tgl); 

    
    if (tgl.getMonth() !== bulanSekarang) return;

    if (!groupedByWeek[minggu]) {
      groupedByWeek[minggu] = { pemasukan: 0, pengeluaran: 0 };
    } 

      if (tgl.getMonth() === bulanSekarang && tgl.getFullYear() === tahunSekarang ) {

        groupedByWeek[minggu].pemasukan += item.pemasukan || 0;
        groupedByWeek[minggu].pengeluaran += item.penarikan || 0;

      }
     
    });
   
  return Object.keys(groupedByWeek).map((mingguIndex, index) => ({
       name: `${index + 1}`, 
       pemasukan: groupedByWeek[mingguIndex].pemasukan, 
       pengeluaran: groupedByWeek[mingguIndex].pengeluaran
  }));
}
