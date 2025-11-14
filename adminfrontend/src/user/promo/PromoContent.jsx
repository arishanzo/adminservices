import { useEffect, useMemo, useState } from "react";
import { Plus, Edit3, Trash2, Tag, Percent, Save, X, Search } from "lucide-react";
import Pagination from "../components/Pagination";
import { UseGetPromo } from "../../hook/useGetPromo";
import ModalPromo from "./modal/ModalPromo";
import ModalEditPromo from "./modal/ModalEditPromo";
import toast from "react-hot-toast";
import axiosClient from "../../lib/axios";

const PromoContent = () => {
  
  
  const [showModalPromo, setShowModalPromo] = useState(false);
  const [showModalEditPromo, setShowModalEditPromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  
  const [textButtonHapus, setTextButtonHapus] = useState("Hapus");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  
    const [showModalHapus, setShowModalHapus] = useState(false);
    const [selectedHapus, setSelectedHapus] = useState(null);

  const { Promo, loading } = UseGetPromo() || [];


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

 const filteredData = useMemo(() => {
    return  Promo?.filter((item) => {
    const cocokNama = (item.judulpromo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const cocokTanggal = (item.tglpromo || '').toLowerCase().includes(searchTerm.toLowerCase());
    return cocokNama || cocokTanggal;

     });
  }, [searchTerm, Promo]);


   const rowsPerPage = 5;
  
   const tambahData = () => {
     setShowModalPromo(true);
   }

  const handleEdit = (idpromo) => {
      const selected = Promo.find(
              (b) => b?.idpromo === idpromo
            );
            if (selected) {
             setSelectedPromo(selected);
              setShowModalEditPromo(true);
            } 
  };

  const handleDelete = (idpromo) => {
   
     const selected = Promo.find(
              (b) => b?.idpromo === idpromo
            );
            if (selected) {
             setSelectedHapus(selected);
              setShowModalHapus(true);
            } 
  };


  
 useEffect(() => {
   if (!Promo) {
      return;
   } 

   const startIndex = (page - 1) * rowsPerPage;
      const endIndex = page * rowsPerPage;
       
      const newPageData = filteredData?.slice(startIndex, endIndex);
    
       setPaginatedData(newPageData);

  }, [Promo, filteredData, page, rowsPerPage]);


    const handleHapus = async (selectedHapus) => {
      try {
        setTextButtonHapus('Prosess...')

        const toastLoading = toast.loading("Memproses data...");
        // kirim request DELETE ke backend
         await axiosClient.delete(`/api/hapuspromo/${selectedHapus.idpromo}`);
        toast.dismiss(toastLoading);
        
        setShowModalHapus(false);
          toast.success("🎉 Promo Berhasil Dihapus", {
                style: {
                    border: '1px solid #16A34A',
                    background: '#ECFDF5', 
                    color: '#065F46',
                    fontWeight: '500',
                },
                iconTheme: {
                    primary: '#16A34A',
                    secondary: '#ECFDF5',
                    },
            });
            
        setTimeout(() => window.location.reload(), 2000);
      

      } catch (err) {
         setStatus( err.response.data.messageerors);
       setTextButtonHapus("Edit Promo");
      setDisabled(false);
    } finally {
      setTextButtonHapus("Edit Promo");
      setTimeout(() => setStatus(""), 3000);
      }
    };


    if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen space-y-8 animate-pulse">
  
        <header>
          <div className="h-8 w-48 bg-gray-200 rounded-md mb-3" />
          <div className="h-4 w-64 bg-gray-200 rounded-md" />
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded-md" />
          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-3">
            <div className="h-10 w-20 bg-gray-200 rounded-xl" />
            <div className="h-10 w-32 bg-gray-200 rounded-xl" />
          </div>
        </div>

       
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="h-6 w-48 bg-gray-200 rounded-md mb-4" />
          <div className="h-10 w-1/2 bg-gray-200 rounded-xl mb-6" />

          <div className="flex justify-between border-b pb-3 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-24 bg-gray-200 rounded-md" />
            ))}
          </div>

          
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-4 w-24 bg-gray-200 rounded-md" />
              ))}
            </div>
          ))}
          
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <>
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          Manajemen Promo
        </h1>
        <p className="text-gray-600">Tambah, edit, atau hapus promo dengan mudah.</p>
      </header>


            {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('Berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }


      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
      

        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-full flex gap-3 justify-end mt-2">
            <button
              type="submit"
              onClick={() => tambahData()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition`}
            >
              <Save className="w-4 h-4" />
              Tambah Promo
            </button>
          </div>
        </div>
      </div>

      {/* Daftar Promo */}
      <div className="bg-white rounded-2xl shadow-sm">
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
        <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 font-medium">Nama Promo</th>
                <th className="py-3 px-4 font-medium">Kode</th>
                <th className="py-3 px-4 font-medium">Tanggal</th>
                <th className="py-3 px-4 font-medium">Tanggal Berakhir</th>
                <th className="py-3 px-4 font-medium">Stok</th>
                <th className="py-3 px-4 font-medium">Potongan</th>
                <th className="py-3 px-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((promo) => (
                <tr key={promo.idpromo} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{promo.judulpromo}</td>
                  <td className="py-3 px-4">{promo.keteranganpromo}</td>
                     <td className="py-3 px-4">{promo.tglpromo}</td>
                        <td className="py-3 px-4">{promo.tglberakhirpromo}</td>
                  <td className="py-3 px-4">{promo.stokpromo}</td>
                  <td className="py-3 px-4">{promo.jumlahdiskon}%</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(promo.idpromo)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(promo.idpromo)}
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
          </div>
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

       <ModalPromo
                  isOpen={showModalPromo}
                  onClose={() => setShowModalPromo(false)}
                />
  <ModalEditPromo
                  isOpen={showModalEditPromo}
                  selectedPromo={selectedPromo}
                  onClose={() => setShowModalEditPromo(false)}
                />


                  {/* Modal Popup */}
            {showModalHapus && (
               <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  onClick={() => setShowModalHapus(false)}
>
  <div 
    className="bg-white rounded-lg p-6 max-w-sm mx-4 relative"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Tombol X */}
    <button
      onClick={() => setShowModalHapus(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           className="h-5 w-5" 
           viewBox="0 0 20 20" 
           fill="currentColor">
        <path fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                 1.414L11.414 10l4.293 4.293a1 1 0 
                 01-1.414 1.414L10 11.414l-4.293 
                 4.293a1 1 0 01-1.414-1.414L8.586 
                 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" />
      </svg>
    </button>

    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 
          2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 
          0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Peringatan!</h3>
      <p className="text-sm text-gray-500 mb-4">Apa Anda Yakin Hapus Data Tugas Ini</p>
    <div className="grid grid-cols-2 gap-4">
  <button
   onClick={() => handleHapus(selectedHapus)}
    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
  >
    {textButtonHapus}
  </button>
  <button
     disabled={disabled}
     onClick={() => setShowModalHapus(false)}
    className={`${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        } w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200`}
  >
    Batal
  </button>
</div>

    </div>
    
  </div>
</div>
)}



                </>
  );
};

export default PromoContent;
