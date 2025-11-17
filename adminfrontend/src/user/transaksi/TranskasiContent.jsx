import { useEffect, useState, useMemo } from "react";
import { Search, Filter, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import Pagination from "../components/Pagination";
import { UseGetPermintaanPenarikan } from "../../hook/useGetPermintaanPenarikan";
import SkeletonPenarikan from "./SkeletonPenarikan";

const TransaksiContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

   const { permintaanPenarikan, loading }   = UseGetPermintaanPenarikan();
  const data = permintaanPenarikan;

  
  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      const cocokNama = item?.user__guru.name.toLowerCase().includes(searchTerm.toLowerCase());
      const cocokStatus = filterStatus === "Semua" || item.statuspermintaan === filterStatus;
      return cocokNama && cocokStatus;
    });
  }, [searchTerm, filterStatus, data]);

    const rowsPerPage = 5;

    useEffect(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = page * rowsPerPage;
     
    const newPageData = filteredData?.slice(startIndex, endIndex);
  
     setPaginatedData(newPageData);
     
     }, [filteredData, page, rowsPerPage]);
  

      useEffect(() => {
   if (permintaanPenarikan) {
      return;
   } 

  }, [permintaanPenarikan]);

     if(loading) return <SkeletonPenarikan />; 
    

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Permintaan Penarikan</h1>
        <p className="text-gray-600">Kelola Permintaan Penarikan Uang Guru disini</p>
      </header>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Permintaan</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1">23</p>
          </div>
          <Clock className="w-8 h-8 text-indigo-500" />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Sudah Disetujui</h2>
            <p className="text-2xl font-semibold text-green-600 mt-1">14</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Menunggu Proses</h2>
            <p className="text-2xl font-semibold text-yellow-500 mt-1">9</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama guru..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter dan Kalender */}
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-100"
            >
              <Filter className="w-4 h-4" /> {filterStatus}
            </button>

            {/* Dropdown Filter */}
            {showFilter && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10">
                {["Semua", "Menunggu", "Disetujui", "Ditolak"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filterStatus === status ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-100">
            <Calendar className="w-4 h-4" /> Kalender
          </button>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 font-medium">Nama Guru</th>
              <th className="py-3 px-4 font-medium">Jumlah</th>
              <th className="py-3 px-4 font-medium">Tanggal</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{item.user__guru.name}</td>
                  <td className="py-3 px-4">Rp {item.jumlahpenarikan.toLocaleString()}</td>
                  <td className="py-3 px-4">{item.tglpermintaanpenarikan}</td>
                  <td className="py-3 px-4">
                    {item.statuspermintaan === "Disetujui" && (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="w-4 h-4" /> Disetujui
                      </span>
                    )}
                    {item.statuspermintaan === "Menunggu" && (
                      <span className="inline-flex items-center gap-1 text-yellow-500 font-medium">
                        <Clock className="w-4 h-4" /> Menunggu
                      </span>
                    )}
                    {item.statuspermintaan === "Ditolak" && (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                        <XCircle className="w-4 h-4" /> Ditolak
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
            <Pagination
          currentPage={page}
          totalData={filteredData?.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default TransaksiContent;
