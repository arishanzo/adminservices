import { useState } from "react";
import { Users, User, GraduationCap, Search, Mail, Phone, UserCheck, UserX } from "lucide-react";

const PenggunaContent = () => {
  const [tab, setTab] = useState("murid");
  const [searchTerm, setSearchTerm] = useState("");

  const dataMurid = [
    { id: 1, nama: "Ayu Lestari", email: "ayu@gmail.com", telp: "08123456789", status: "Aktif" },
    { id: 2, nama: "Rian Pratama", email: "rianp@gmail.com", telp: "08127881234", status: "Nonaktif" },
  ];

  const dataGuru = [
    { id: 1, nama: "Budi Santoso", email: "budi@guru.com", telp: "08567890012", status: "Aktif" },
    { id: 2, nama: "Siti Aminah", email: "siti@guru.com", telp: "08127776655", status: "Aktif" },
    { id: 3, nama: "Rizky Ramadhan", email: "rizky@guru.com", telp: "08512233445", status: "Nonaktif" },
  ];

  const dataTampil =
    tab === "murid"
      ? dataMurid.filter((d) => d.nama.toLowerCase().includes(searchTerm.toLowerCase()))
      : dataGuru.filter((d) => d.nama.toLowerCase().includes(searchTerm.toLowerCase()));

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
              <th className="py-3 px-4 font-medium">Telepon</th>
              <th className="py-3 px-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataTampil.length > 0 ? (
              dataTampil.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{item.nama}</td>
                  <td className="py-3 px-4 flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" /> {item.telp}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.status === "Aktif" ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <UserCheck className="w-4 h-4" /> Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                        <UserX className="w-4 h-4" /> Nonaktif
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
    </div>
  );
};

export default PenggunaContent;
