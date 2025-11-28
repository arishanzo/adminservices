import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet, Users, Star, BookOpen, TrendingUp, Settings, Clock, CheckCircle } from "lucide-react";
import PermintaanPenarikan from "./PermintaanPenarikan";
import RiwayatTransaksi from "./RiwayatTransaksi";
import { UseGetSaldoKeluar } from "../../hook/useGetSaldoKeluar";
import { UseGetSaldoMasuk } from "../../hook/useGetSaldoMasuk";
import SkeletonDashboard from "./SkeletonDashboard";
import { UseGetPermintaanPenarikan } from "../../hook/useGetPermintaanPenarikan";

function formatRupiahSingkat(angka) {
  if (angka >= 1_000_000) {
    return (angka / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (angka >= 1_000) {
    return (angka / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return angka.toString();
}


const Content = () => {


  const [ tglPerbarui, setTglPerbarui] = useState();

  const now = new Date();
  const bulanSekarang = now.getMonth();
  const tahunSekarang = now.getFullYear();


  const { saldoMasuk }= UseGetSaldoMasuk();
  const { saldoKeluar } = UseGetSaldoKeluar() ;
  const { permintaanPenarikan, loading }   = UseGetPermintaanPenarikan();


  const totalSaldoMasuk = saldoMasuk?.reduce((acc, item) => acc + item.jumlahsaldo, 0);
  const totalSaldoKeluar = saldoKeluar?.reduce((acc, item) => acc + item.jumlahsaldokeluar, 0);

  const totalSaldoSaatIni = totalSaldoMasuk - totalSaldoKeluar;

  
  const dataSaldoBulanIni = saldoMasuk?.filter((item) => {
   const tgl = new Date(item.tglsaldomasuk);
   return tgl.getMonth() === bulanSekarang && tgl.getFullYear() === tahunSekarang
  });

  const totalSaldoBulanIni = dataSaldoBulanIni?.reduce((acc, item) => acc + item.jumlahsaldo, 0);


  const dataPenarikanBulanIni = saldoKeluar?.filter((item) => {
   const tgl = new Date(item.tglsaldokeluar);
   return tgl.getMonth() === bulanSekarang && tgl.getFullYear() === tahunSekarang
  });

   const dataSaldoHariIni = saldoMasuk?.filter((item) => {
   const tgl = new Date(item.tglsaldomasuk);
   return tgl === now
  })

   const dataPenarikanHariIni = saldoKeluar?.filter((item) => {
   const tgl = new Date(item.tglsaldokeluar);
   return tgl === now
   })

  const totalPenarikanBulanIni = dataPenarikanBulanIni?.reduce((acc, item) => acc + item.jumlahsaldokeluar, 0);
  const totalTransaksiBulanIni = dataPenarikanHariIni?.length + dataSaldoHariIni?.length;


console.log(saldoKeluar)

   useEffect(() => {
     if (!saldoMasuk || !saldoKeluar) {
        return;
     } 

   if (saldoMasuk || saldoKeluar) {
        return setTglPerbarui(new Date());
     } 

     
  
    }, [saldoMasuk, saldoKeluar]);

    if (loading) return <SkeletonDashboard />



  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
     {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat Datang Admin, Di Halaman Dashboard</p>
      </header>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="mb-2">
            <h3 className="font-semibold text-sm">Saldo Sistem Tersedia</h3>
            <p className="text-3xl font-bold mt-1">Rp {totalSaldoSaatIni.toLocaleString("id-ID")}</p>
            <p className="text-sm opacity-80 mt-1">Terakhir diperbarui: {
              new Date(tglPerbarui).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              }</p>
          </div>
          <Wallet className="w-10 h-10 opacity-80" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Saldo Masuk</p>
            <ArrowDownCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">Rp. {formatRupiahSingkat(totalSaldoBulanIni)}</p>
          <p className="text-xs text-green-600 pt-1">(+) Total Saldo Bulan Ini</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Penarikan</p>
            <ArrowUpCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">Rp. {formatRupiahSingkat(totalPenarikanBulanIni)}</p>
          <p className="text-xs text-red-600 pt-1">(-) Penarikan Bulan Ini</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Permintaan Pending</p>
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{permintaanPenarikan?.length}</p>
          <p className="text-xs text-yellow-600 pt-1">Menunggu approval</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Transaksi Hari Ini</p>
            <CheckCircle className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalTransaksiBulanIni}</p>
          <p className="text-xs text-blue-600">{dataSaldoHariIni.length} masuk, {dataPenarikanHariIni.length} keluar</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex flex-col items-center p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
          <BookOpen className="w-7 h-7 mb-2 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Kelola Transaksi</span>
        </button>
        <button className="flex flex-col items-center p-5 bg-green-50 rounded-xl hover:bg-green-100 transition">
          <Users className="w-7 h-7 mb-2 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Kelola Pengguna</span>
        </button>
        <button className="flex flex-col items-center p-5 bg-purple-50 rounded-xl hover:bg-purple-100 transition">
          <TrendingUp className="w-7 h-7 mb-2 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Lihat Laporan</span>
        </button>
        <button className="flex flex-col items-center p-5 bg-orange-50 rounded-xl hover:bg-orange-100 transition">
          <Settings className="w-7 h-7 mb-2 text-orange-600" />
          <span className="text-sm font-medium text-gray-700">Pengaturan</span>
        </button>
      </div>

      {/* Withdraw Requests */}
     <PermintaanPenarikan getPermintaanPenarikan={permintaanPenarikan} />

      {/* Transaction History */}
      <RiwayatTransaksi getSaldoMasuk={dataSaldoBulanIni} getSaldoKeluar={dataPenarikanBulanIni} />
      
    </div>
  );
};

export default Content;
