import { useEffect, useMemo, useState } from "react";
import { Plus, Edit3, Trash2, Tag, Percent, Save, X, Search } from "lucide-react";
import Pagination from "../components/Pagination";

const PromoContent = () => {
    
  const [promos, setPromos] = useState([
    { id: 1, nama: "Diskon Akhir Tahun", kode: "AKHIR2025", tanggal: '19-01-100' , potongan: 25 },
    { id: 2, nama: "Promo Guru Hebat", kode: "GURUHEBAT", tanggal: '19-01-100' , potongan: 15 },
  ]);

  const [form, setForm] = useState({ nama: "", kode: "", potongan: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

 const filteredData = useMemo(() => {
    return  promos.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const cocokKode = item.kode.toLowerCase().includes(searchTerm.toLowerCase());
    const cocokTanggal = item.tanggal.toLowerCase().includes(searchTerm.toLowerCase());
    return cocokNama || cocokKode || cocokTanggal;

     });
  }, [searchTerm, promos]);


   const rowsPerPage = 5;
  
      useEffect(() => {
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = page * rowsPerPage;
       
      const newPageData = filteredData.slice(startIndex, endIndex);
    
       setPaginatedData(newPageData);
       
       }, [filteredData, page, rowsPerPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.kode || !form.potongan) return;

    if (isEditing) {
      setPromos(
        promos.map((promo) =>
          promo.id === editId ? { ...promo, ...form } : promo
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setPromos([
        ...promos,
        { id: Date.now(), ...form, potongan: Number(form.potongan) },
      ]);
    }

    setForm({ nama: "", kode: "", potongan: "" });
  };

  const handleEdit = (promo) => {
    setIsEditing(true);
    setEditId(promo.id);
    setForm({
      nama: promo.nama,
      kode: promo.kode,
      potongan: promo.potongan,
    });
  };

  const handleDelete = (id) => {
    setPromos(promos.filter((promo) => promo.id !== id));
  };

  const handleCancel = () => {
    setForm({ nama: "", kode: "", potongan: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          Manajemen Promo
        </h1>
        <p className="text-gray-600">Tambah, edit, atau hapus promo dengan mudah.</p>
      </header>

      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {isEditing ? (
            <>
              <Edit3 className="w-5 h-5 text-yellow-500" />
              Edit Promo
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-green-600" />
              Tambah Promo Baru
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nama Promo"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Kode Promo"
            value={form.kode}
            onChange={(e) => setForm({ ...form, kode: e.target.value })}
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Percent className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="number"
              placeholder="Potongan (%)"
              value={form.potongan}
              onChange={(e) => setForm({ ...form, potongan: e.target.value })}
              className="w-full focus:outline-none"
            />
          </div>

          <div className="col-span-full flex gap-3 justify-end mt-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 text-gray-700"
              >
                <X className="w-4 h-4" /> Batal
              </button>
            )}
            <button
              type="submit"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white ${
                isEditing
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <Save className="w-4 h-4" />
              {isEditing ? "Simpan Perubahan" : "Tambah Promo"}
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Promo */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Daftar Promo Aktif
        </h2>
      <div className="relative w-full md:w-1/2 mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama guru..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {paginatedData.length > 0 ? (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 font-medium">Nama Promo</th>
                <th className="py-3 px-4 font-medium">Kode</th>
                <th className="py-3 px-4 font-medium">Tanggal</th>
                <th className="py-3 px-4 font-medium">Potongan</th>
                <th className="py-3 px-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((promo) => (
                <tr key={promo.id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{promo.nama}</td>
                  <td className="py-3 px-4">{promo.kode}</td>
                     <td className="py-3 px-4">{promo.tanggal}%</td>
                  <td className="py-3 px-4">{promo.potongan}%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-6">
            Belum ada promo yang ditambahkan.
          </p>
        )}

           <Pagination
          currentPage={page}
          totalData={filteredData.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default PromoContent;
