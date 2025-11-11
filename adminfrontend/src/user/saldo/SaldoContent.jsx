import { useState, useMemo } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp, TrendingDown, Search, Calendar } from "lucide-react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useEffect } from "react";

const SaldoContent = () => {
  // === Data Dummy ===
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

  // === State untuk search & pagination ===
  const [searchMasuk, setSearchMasuk] = useState("");
  const [searchKeluar, setSearchKeluar] = useState("");
  const [pageMasuk, setPageMasuk] = useState(1);
  const [pageKeluar, setPageKeluar] = useState(1);
  
  const [showCalendarMasuk, setShowCalendarMasuk] = useState(false);
  const [showCalendarKeluar, setShowCalendarKeluar] = useState(false);

  const [paginatedKeluar, setPaginatedKeluar] = useState([]);
  const [paginatedMasuk, setPaginatedMasuk] = useState([]);

const [lastSelectedKeluar, setLastSelectedKeluar] = useState(null);

const [lastSelectedMasuk, setLastSelectedMasuk] = useState(null);

  const [rangeMasuk, setRangeMasuk] = useState([ 
    { startDate: new Date, endDate: new Date, key: "selection" },
]);

  const [rangeKeluar, setRangeKeluar] = useState([
  { startDate: new Date, endDate: new Date, key: "selection" },
  ]);


  const handleDateChangeKeluar = (item) => {
    const { startDate, endDate } = item.selection;

    // Jika tanggal yang diklik sama dengan sebelumnya → reset
    if (
     lastSelectedKeluar &&
      startDate?.toDateString() === lastSelectedKeluar.startDate?.toDateString() &&
      endDate?.toDateString() === lastSelectedKeluar.endDate?.toDateString()
    ) {
      setRangeKeluar([
        {
          startDate: new Date,
          endDate: new Date,
          key: "selection",
        },
      ]);
      setLastSelectedKeluar(null);
      return;
    }

    // Simpan range baru
    setRangeKeluar([item.selection]);
    setLastSelectedKeluar(item.selection);
  };

  const handleDateChangeMasuk = (item) => {
    const { startDate, endDate } = item.selection;

    // Jika tanggal yang diklik sama dengan sebelumnya → reset
    if (
     lastSelectedMasuk &&
      startDate?.toDateString() === lastSelectedMasuk.startDate?.toDateString() &&
      endDate?.toDateString() === lastSelectedMasuk.endDate?.toDateString()
    ) {
      setRangeMasuk([
        {
          startDate: new Date,
          endDate: new Date,
          key: "selection",
        },
      ]);
      setLastSelectedMasuk(null);
      return;
    }

    // Simpan range baru
    setRangeMasuk([item.selection]);
    setLastSelectedMasuk(item.selection);
  };

 
  // === Filter Berdasarkan Rentang Tanggal ===
  const filteredMasuk = useMemo(() => {
    return saldoMasuk.filter((item) => {
      const date = new Date(item.tanggal);
      return date >= rangeMasuk[0].startDate && date <= rangeMasuk[0].endDate;
    });
  }, [saldoMasuk, rangeMasuk]);

  const filteredKeluar = useMemo(() => {
    return saldoKeluar.filter((item) => {
      const date = new Date(item.tanggal);
      return date >= rangeKeluar[0].startDate && date <= rangeKeluar[0].endDate;
    });
  }, [saldoKeluar, rangeKeluar]);

  const rowsPerPage = 5;


  // === Filter & Pagination ===
  const  cariFilterMasuk = useMemo(
    () =>
      saldoMasuk.filter((item) =>
        item.sumber.toLowerCase().includes(searchMasuk.toLowerCase())
      ),
    [searchMasuk, saldoMasuk]
  );



  const  cariFilterKeluar = useMemo(
    () =>
      saldoKeluar.filter((item) =>
        item.tujuan.toLowerCase().includes(searchKeluar.toLowerCase())
      ),
    [searchKeluar, saldoKeluar]
  );
  

  

  useEffect(() => {
  const startIndex = (pageKeluar - 1) * rowsPerPage;
  const endIndex = pageKeluar * rowsPerPage;
   
  const newPageData = filteredKeluar.length > 0
        ? filteredKeluar.slice(startIndex, endIndex)
        : cariFilterKeluar.slice(startIndex, endIndex);


  setPaginatedKeluar(newPageData);
}, [filteredKeluar, cariFilterKeluar, pageKeluar, rowsPerPage, showCalendarKeluar]);

console.log(filteredMasuk)

useEffect(() => {
  const startIndex = (pageMasuk - 1) * rowsPerPage;
  const endIndex = pageMasuk * rowsPerPage;
   const newPageData =
        filteredMasuk.length > 0
        ? filteredMasuk.slice(startIndex, endIndex)
        : cariFilterMasuk.slice(startIndex, endIndex);

  setPaginatedMasuk(newPageData);
}, [filteredMasuk, cariFilterMasuk, pageMasuk, rowsPerPage, showCalendarMasuk]);

 

  // === Total Ringkasan ===
  const totalMasuk = saldoMasuk.reduce((a, b) => a + b.jumlah, 0);
  const totalKeluar =  saldoKeluar.reduce((a, b) => a + b.jumlah, 0);
  const saldoTersedia = totalMasuk - totalKeluar;

  // === Pagination component ===
  const Pagination = ({ currentPage, totalData, onPageChange }) => {
    const totalPages = Math.ceil(totalData / rowsPerPage);
    return (
      <div className="flex justify-end items-center mt-4 gap-2 text-sm">
        <button
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>
        <span className="text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Selanjutnya
        </button>
      </div>
    );
  };

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

         <div className="flex md:justify-end pt-8">
        <button
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition"
            onClick={() => setShowCalendarMasuk(!showCalendarMasuk)}
        >
            <Calendar className="w-4 h-4 text-gray-600" /> Filter Tanggal
        </button>
        </div>
         {showCalendarMasuk && (
          <div className="absolute  z-10 bg-white shadow-lg rounded-lg">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeMasuk}
              moveRangeOnFirstSelection={false}
              ranges={rangeMasuk}
             rangeColors={ ["#16a34a"]  }
            />
          </div>
        )}

      {/* SALDO MASUK */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <ArrowDownCircle className="text-green-600" /> Saldo Masuk
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari sumber..."
              value={searchMasuk}
              onChange={(e) => {
                setSearchMasuk(e.target.value);
                setPageMasuk(1);
              }}
              className="border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2 text-left">Sumber</th>
              <th className="py-2 text-left">Tanggal</th>
              <th className="py-2 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMasuk.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{item.sumber}</td>
                <td className="py-2 text-gray-600">{item.tanggal}</td>
                <td className="py-2 text-right text-green-600 font-medium">
                  +Rp {item.jumlah.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
            {paginatedMasuk.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total di bawah tabel */}
        <div className="flex justify-end mt-4 border-t pt-3">
          <p className="text-sm font-semibold text-gray-700">
            Total Saldo Masuk:{" "}
            <span className="text-green-600">
            Rp { filteredMasuk.length > 0 ? filteredMasuk.reduce((a, b) => a + b.jumlah, 0).toLocaleString("id-ID") : totalMasuk.toLocaleString("id-ID")}
       
            </span>
          </p>
        </div>

        <Pagination
          currentPage={pageMasuk}
          totalData={filteredMasuk.length}
          onPageChange={setPageMasuk}
        />
      </div>


         <div className="flex md:justify-end pt-8">
        <button
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition"
            onClick={() => setShowCalendarKeluar(!showCalendarKeluar)}
        >
            <Calendar className="w-4 h-4 text-gray-600" /> Filter Tanggal 
        </button>
        </div>


    {showCalendarKeluar && (
          <div className="absolute z-10  bg-white shadow-lg rounded-lg">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeKeluar}
              moveRangeOnFirstSelection={false}
              ranges={rangeKeluar}
              rangeColors={["#16a34a"]}
            />
          </div>
        )}

      {/* SALDO KELUAR */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <ArrowUpCircle className="text-red-600" /> Saldo Keluar
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari tujuan..."
              value={searchKeluar}
              onChange={(e) => {
                setSearchKeluar(e.target.value);
                setPageKeluar(1);
              }}
              className="border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2 text-left">Tujuan</th>
              <th className="py-2 text-left">Tanggal</th>
              <th className="py-2 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {paginatedKeluar.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{item.tujuan}</td>
                <td className="py-2 text-gray-600">{item.tanggal}</td>
                <td className="py-2 text-right text-red-600 font-medium">
                  -Rp {item.jumlah.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
            {paginatedKeluar.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total di bawah tabel */}
        <div className="flex justify-end mt-4 border-t pt-3">
          <p className="text-sm font-semibold text-gray-700">
            Total Saldo Keluar:{" "}
            <span className="text-red-600">
              Rp { filteredKeluar.length > 0 ? filteredKeluar.reduce((a, b) => a + b.jumlah, 0).toLocaleString("id-ID") : totalKeluar.toLocaleString("id-ID")}
            </span>
          </p>
        </div>

        <Pagination
          currentPage={pageKeluar}
          totalData={filteredKeluar.length}
          onPageChange={setPageKeluar}
        />
      </div>
    </div>
  );
};

export default SaldoContent;
