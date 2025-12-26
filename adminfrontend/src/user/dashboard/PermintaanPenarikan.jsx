import { useMemo } from "react";
import { UseGetGuru } from "../../hook/useGetGuru";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const PermintaanPenarikan = ({ getPermintaanPenarikan }) => {

  
  const { guru } = UseGetGuru() || [];

     const withdrawRequests = useMemo(() => {
        return getPermintaanPenarikan?.filter((item) => 
          item.statuspermintaan === 'pending'
          ).slice(0,3) 
        }, [getPermintaanPenarikan]);

    return (
            <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Permintaan Penarikan</h2>
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
            {withdrawRequests?.length > 0 ? (
              withdrawRequests.map((item, index) => (
                <tr key={item.idpermintaanpenarikan || index} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{guru?.find(b => b.idprofilguru === item.idprofilguru).user__guru.name}</td>
                  <td className="py-3 px-4">Rp {item.jumlahpenarikan.toLocaleString()}</td>
                  <td className="py-3 px-4">{item.tglpermintaanpenarikan}</td>
                  <td className="py-3 px-4">
                    {item.statuspermintaan === "Disetujui" && (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="w-4 h-4" /> Disetujui
                      </span>
                    )}
                    {item.statuspermintaan === "pending" && (
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
                  Tidak ada data permintaan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {withdrawRequests?.length > 0 && (
        <div className="flex justify-center mt-4">
            <a
            href="/kelolatransaksi"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
            Lihat Semua
            </a>
        </div>
        )}


      </div>
    )

}

export default PermintaanPenarikan;