import { motion as Motion, AnimatePresence } from "framer-motion";
import { Calendar, Percent, X } from "lucide-react";
import axiosClient from "../../../lib/axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ModalPromo = ({ isOpen, onClose}) => {

  

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Tambah Promo");



  const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


      const [formData, setFormData] = useState({
        judulpromo:  '',
        keteranganpromo: '',
        tglpromo: '',
        tglberakhirpromo:  '',
        stokpromo: '',
        jumlahdiskon: '',
    });



  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
    if (val !== null && val !== "") {
      dataForm.append(key, val);
    }
    });
    
     
    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset
    
    const toastLoading = toast.loading("Memproses data...");

    try {
    
  
    await axiosClient.post(`/api/createpromo`, dataForm);

      toast.dismiss(toastLoading);
   
     toast.success("🎉 Promo berhasil diinputkan", {
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
    
       setTimeout(() => window.location.reload(), 5000);
       setDisabled(true);

    } catch (err) {
          toast.dismiss(toastLoading);
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Tambah Data gagal."] });
      setStatus( err.response.data.messageerors);
       setTextButton("Tambah Promo");
       
      setDisabled(false);
    } finally {
      setTextButton("Tambah Promo");
      setTimeout(() => setStatus(""), 3000);
    }
  };

 


  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Konten Modal */}
        <Motion.div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl w-full max-h-full md:relative md:rounded-2xl md:max-w-4xl md:mx-auto overflow-hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-green-700">Tambah / Edit Promo</h2>
           
            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            >
            <X size={24} />
            </button>

            
        </div>


            {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('Berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }

      <form className="p-2 md:p-6" onSubmit={handleSubmit}>
  <div className="px-4 py-5 sm:p-0 max-h-[80vh] overflow-y-auto md:overflow-y-hidden">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
      
      {/* Nama Promo */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Promo</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Masukkan nama promo"
          name="judulpromo"
          value={formData.judulpromo}
          onChange={handleChange}
        />
        {errors?.judulpromo?.[0] && <small style={{ color: 'red' }}>{errors.judulpromo[0]}</small>}
      </div>

      {/* Kode Promo */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Kode Promo</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Masukkan kode promo"
          value={formData.keteranganpromo}
          name="keteranganpromo"
          onChange={handleChange}
        />
        {errors?.keteranganpromo && <small style={{ color: 'red' }}>{errors.keteranganpromo}</small>}
      </div>

      {/* Tanggal Promo */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Promo</label>
        <div className="flex items-center rounded-xl px-3 py-2">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Masukkan tanggal promo"
            value={formData.tglpromo}
            name="tglpromo"
            onChange={handleChange}
          />
        </div>
        {errors?.tglpromo?.[0] && <small style={{ color: 'red' }}>{errors.tglpromo[0]}</small>}
      </div>

      {/* Tanggal Berakhir Promo */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Berakhir Promo</label>
        <div className="flex items-center rounded-xl px-3 py-2">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="date"
            className="w-full px-4 py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Masukkan tanggal berakhir"
            value={formData.tglberakhirpromo}
            name="tglberakhirpromo"
            onChange={handleChange}
          />
        </div>
        {errors?.tglberakhirpromo?.[0] && <small style={{ color: 'red' }}>{errors.tglberakhirpromo[0]}</small>}
      </div>

      {/* Stock Promo */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Promo</label>
        <input
          type="number"
          className="w-full px-4 py-3 border rounded-lg  focus:ring-2 focus:ring-green-500 "
          placeholder="Stock Promo"
          value={formData.stokpromo}
          name="stokpromo"
          onChange={handleChange}
        />
        {errors?.stokpromo?.[0] && <small style={{ color: 'red' }}>{errors.stokpromo[0]}</small>}
      </div>

      {/* Jumlah Diskon */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Diskon</label>
        <div className="flex items-center  rounded-xl px-3 py-2 ">
          <Percent className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 "
            placeholder="Jumlah Diskon"
            value={formData.jumlahdiskon}
            name="jumlahdiskon"
            onChange={handleChange}
          />
        </div>
        {errors?.jumlahdiskon?.[0] && <small style={{ color: 'red' }}>{errors.jumlahdiskon[0]}</small>}
      </div>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t flex justify-between md:justify-end items-center gap-4">
      <button
        type="submit"
        disabled={disabled}
        className={`${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        } mt-5 tracking-wide text-sm font-semibold bg-green-700 text-white w-[50%] py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
      >
        {textButton}
      </button>
    </div>
  </div>
</form>

          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPromo;




