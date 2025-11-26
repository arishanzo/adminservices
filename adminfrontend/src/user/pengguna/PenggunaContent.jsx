import { useEffect, useMemo, useState } from "react";
import {User, GraduationCap, Search, Phone, UserCheck, UserX, Calendar } from "lucide-react";
import { UseGetGuru } from "../../hook/useGetGuru";
import SkeletonPengguna from "./SkeletonPengguna";
import { UseGetMurid } from "../../hook/useGetMurid";
import Pagination from "../components/Pagination";

const PenggunaContent = () => {
  const [tab, setTab] = useState("murid");
  const [searchTerm, setSearchTerm] = useState("");

  
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
   const rowsPerPage = 5;

  const { murid } = UseGetMurid() || [];

const { guru, loading } = UseGetGuru() || [];


const dataTampil = useMemo(() => {
 return  tab === "murid"
    ? murid?.filter((d) =>
        (d?.user__login?.nama_user|| '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    :  guru?.filter((d) =>
        (d.user_guru?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [tab, murid, guru, searchTerm]);


      console.log(dataTampil)
       useEffect(() => {
         if (!guru && !murid) {
            return;
         } 
      
          const startIndex = (page - 1) * rowsPerPage;
      const endIndex = page * rowsPerPage;
       
      const newPageData = dataTampil?.slice(startIndex, endIndex);
    
       setPaginatedData(newPageData)

        }, [guru, murid, dataTampil, page, rowsPerPage]);

  if (loading) return <SkeletonPengguna />
        
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          Manajemen Pengguna
        </h1>
        <p className="text-gray-600">Kelola data pengguna murid dan guru di platform Anda.</p>
      </header>

      {/* Tab Filter (Murid / Guru) */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab("murid")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
            tab === "murid"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Murid
        </button>
        <button
          onClick={() => setTab("guru")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
            tab === "guru"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="w-4 h-4" /> Guru
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={`Cari ${tab === "murid" ? "murid" : "guru"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Tabel Data */}
      <div className="bg-white shadow-sm rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 font-medium">Nama</th>
              <th className="py-3 px-4 font-medium">Alamat Lengkap</th>
              <th className="py-3 px-4 font-medium">Telepon</th>
              
              <th className="py-3 px-4 font-medium text-center">Tanggal Daftar</th>
              <th className="py-3 px-4 font-medium text-center">Status Akun</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{tab  === 'murid' ? item.user__login?.nama_user : item.user__guru?.name}</td>
                    <td className="py-3 px-4">{item.alamatlengkap}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" /> {item.no_telp}
                  </td>

                     <td className="py-3 px-4 text-center">
                         <span className="inline-flex items-center gap-1 ">
                    <Calendar className="w-4 h-4 " /> {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      }
                    </span>
                  </td>
                  
                  <td className="py-3 px-4 text-center">
                    {item.statusakun === "complete" ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <UserCheck className="w-4 h-4" />Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                        <UserX className="w-4 h-4" /> Belum Complete
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  Tidak ada data pengguna ditemukan.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
      
            
           <Pagination
          currentPage={page}
          totalData={dataTampil.length}
          onPageChange={setPage}
        />
    </div>
  );
};

export default PenggunaContent;
