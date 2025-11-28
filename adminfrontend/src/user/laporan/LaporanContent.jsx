import { useEffect, useState } from "react";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Calendar,
  DollarSign,
  BarChart2,
  TrendingUp,
  CalendarDays,
  FileDown,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { UseGetSaldoMasuk } from "../../hook/useGetSaldoMasuk";
import { UseGetSaldoKeluar } from "../../hook/useGetSaldoKeluar";
import SkeletonLaporan from "./SkeletonLaporan";
import { LaporanHarian } from "./data/LaporanHarian";
import { totalPerTahun } from "./fnc/FncTahunan";
import { TotalBulanan } from "./fnc/FncBulanan";
import { TotalMingguan } from "./fnc/fncMinggu";

const LaporanContent = () => {
  const [filter, setFilter] = useState("bulan");


  
  const { saldoMasuk }= UseGetSaldoMasuk();
  const { saldoKeluar, loading } = UseGetSaldoKeluar() ;
  const { dataPenarikanHariIni, dataSaldoHariIni } = LaporanHarian(saldoMasuk, saldoKeluar);
  // const { dataPenarikanTahunIni, dataSaldoTahunIni } = LaporanTahunan(saldoMasuk, saldoKeluar);
 
  
  useEffect(() => {
   if (!saldoMasuk || !saldoKeluar) {
      return;
   } 
  }, [saldoMasuk, saldoKeluar]);


  if(loading) return <SkeletonLaporan/>


  const dataGroups = [
    ...saldoMasuk.map(item => ({tanggal: item.tglsaldomasuk, pemasukan: item.jumlahsaldo})),
    ...saldoKeluar.map(item => ({ tanggal: item.tglsaldokeluar , penarikan: item.jumlahsaldokeluar}))
  ]


  // ====== Data Dummy ======
 const dataHarian = dataSaldoHariIni.map(item => {
  const tanggal = new Date(item.tglsaldomasuk);
  const namaHari = tanggal.toLocaleDateString("id-ID", { weekday: "long" });

  // cari pengeluaran yang tanggalnya sama
  const penarikan = dataPenarikanHariIni.find(
    p => new Date(p.tglsaldokeluar).toDateString() === tanggal.toDateString()
  );

  return {
    name: namaHari,
    pemasukan: item.jumlahsaldo,
    pengeluaran: penarikan ? penarikan.jumlahsaldokeluar : 0
  };
});

  const dataBulanan = TotalBulanan(dataGroups);
  const dataTahunan = totalPerTahun(dataGroups);
  const dataMingguan = TotalMingguan(dataGroups);

  console.log(dataMingguan)

  const getData = () => {
    switch (filter) {
      case "hari":
        return dataHarian;
      case "minggu":
        return dataMingguan;
      case "tahun":
        return dataTahunan;
      default:
        return dataBulanan;
    }
  };

  const data = getData();

  // ====== Export to Excel ======
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Keuangan");
    XLSX.writeFile(workbook, `Laporan_Keuangan_${filter}.xlsx`);
  };

  // ====== Export to PDF ======
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Laporan Keuangan (${filter})`, 14, 15);
    const tableData = data.map((item) => [
      item.name,
      `Rp ${item.pemasukan.toLocaleString()}`,
      `Rp ${item.pengeluaran.toLocaleString()}`,
      `Rp ${(item.pemasukan - item.pengeluaran).toLocaleString()}`,
    ]);
    doc.autoTable({
      head: [["Periode", "Pemasukan", "Pengeluaran", "Keuntungan"]],
      body: tableData,
      startY: 25,
    });
    doc.save(`Laporan_Keuangan_${filter}.pdf`);
  };

  return (
    <div className="p-6 py-16 md:py-8 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <BarChart2 className="w-7 h-7 text-green-600" />
          Laporan Keuangan
        </h1>
        <p className="text-gray-600">
          Pantau pemasukan & pengeluaran berdasarkan waktu dan ekspor laporan.
        </p>
      </header>

      {/* Filter dan Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Filter waktu */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Harian", key: "hari", icon: <CalendarDays className="w-4 h-4" /> },
            { label: "Mingguan", key: "minggu", icon: <TrendingUp className="w-4 h-4" /> },
            { label: "Bulanan", key: "bulan", icon: <Calendar className="w-4 h-4" /> },
            { label: "Tahunan", key: "tahun", icon: <DollarSign className="w-4 h-4" /> },
          ].map(({ label, key, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
                filter === key
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

       
        {/* Tombol Export */}
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition"
          >
            <FileDown className="w-4 h-4" /> Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            <FileDown className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-2xl shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Pemasukan</p>
            <h3 className="text-lg font-bold text-gray-800">
              Rp {data.reduce((sum, d) => sum + d.pemasukan, 0).toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-xl">
            <DollarSign className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Pengeluaran</p>
            <h3 className="text-lg font-bold text-gray-800">
              Rp {data.reduce((sum, d) => sum + d.pengeluaran, 0).toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Keuntungan Bersih</p>
            <h3 className="text-lg font-bold text-gray-800">
              Rp{" "}
              {(
                data.reduce((sum, d) => sum + (d.pemasukan - d.pengeluaran), 0)
              ).toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Grafik {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          {filter === "hari" || filter === "minggu" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="pemasukan"
                stroke="#076051ff"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pengeluaran"
                stroke="#DC2626"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="pemasukan" fill="#076051ff" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pengeluaran" fill="#DC2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LaporanContent;
