import { useMemo } from "react";
import {Wallet, TrendingUp, TrendingDown} from "lucide-react";

import SaldoMasuk from "./SaldoMasuk";
import SaldoKeluar from "./SaldoKeluar";

const SaldoContent = () => {

  const saldoMasuk = useMemo(() => [
    { id: 1, sumber: "Penjualan Kelas Premium", tanggal: "10 Nov 2025", jumlah: 750000 },
    { id: 2, sumber: "Langganan Bulanan", tanggal: "09 Nov 2025", jumlah: 500000 },
    { id: 3, sumber: "Komisi Mitra", tanggal: "08 Nov 2025", jumlah: 1250000 },
    { id: 4, sumber: "Donasi Pengguna", tanggal: "07 Nov 2025", jumlah: 300000 },
    { id: 5, sumber: "Program Afiliasi", tanggal: "06 Nov 2025", jumlah: 450000 },
    { id: 6, sumber: "Penjualan Kelas Dasar", tanggal: "05 Nov 2025", jumlah: 600000 },
  ], []);

  const saldoKeluar = useMemo(() => [
    { id: 1, tujuan: "Penarikan Bank BCA", tanggal: "09 Nov 2025", jumlah: 300000 },
    { id: 2, tujuan: "Biaya Operasional", tanggal: "07 Nov 2025", jumlah: 150000 },
    { id: 3, tujuan: "Bayar Instruktur", tanggal: "06 Nov 2025", jumlah: 500000 },
    { id: 4, tujuan: "Hosting & Domain", tanggal: "05 Nov 2025", jumlah: 200000 },
    { id: 5, tujuan: "Pembelian Alat", tanggal: "04 Nov 2025", jumlah: 350000 },
  ], []);

  const totalMasuk = saldoMasuk.reduce((a, b) => a + b.jumlah, 0);
  const totalKeluar =  saldoKeluar.reduce((a, b) => a + b.jumlah, 0);
  const saldoTersedia = totalMasuk - totalKeluar;

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Saldo</h1>
        <p className="text-gray-600">Pantau dan kelola saldo masuk serta keluar dengan mudah.</p>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Saldo Tersedia</p>
            <h2 className="text-3xl font-bold mt-1">Rp {saldoTersedia.toLocaleString("id-ID")}</h2>
          </div>
          <Wallet className="w-10 h-10 opacity-80" />
        </div>

        <div className="bg-white p-6 rounded-2xl hover:bg-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Masuk</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">Rp {totalMasuk.toLocaleString("id-ID")}</h2>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl hover:bg-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Keluar</p>
            <h2 className="text-2xl font-bold text-red-600 mt-1">Rp {totalKeluar.toLocaleString("id-ID")}</h2>
          </div>
          <TrendingDown className="w-8 h-8 text-red-500" />
        </div>
      </div>

      {/* Content Saldo */}
      <SaldoMasuk saldoMasuk={saldoMasuk} totalMasuk={totalMasuk} />
      <SaldoKeluar saldoKeluar={saldoKeluar} totalKeluar={totalKeluar} />

    </div>
  );
};

export default SaldoContent;
