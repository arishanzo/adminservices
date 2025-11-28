export const LaporanHarian = (saldoMasuk, saldoKeluar) => {
  
  const now = new Date();
  
  const dataSaldoHariIni = saldoMasuk?.filter((item) => {
   const tgl = new Date(item.tglsaldomasuk);
   return tgl === now
  })

   const dataPenarikanHariIni = saldoKeluar?.filter((item) => {
   const tgl = new Date(item.tglsaldokeluar);
   return tgl === now
   })

    return { dataPenarikanHariIni, dataSaldoHariIni}
}

