import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const RiwayatTransaksi = ({ getSaldoMasuk, getSaldoKeluar }) => {
    const transactions = [
    ...getSaldoMasuk.map(item => ({type: "masuk", tanggal: item.tglsaldomasuk, saldo: item.jumlahsaldo})),
    ...getSaldoKeluar.map(item => ({ type: "keluar", tanggal: item.tglsaldokeluar , saldo: item.jumlahsaldokeluar}))
  ].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)).slice(0,3) ;


    return (
 <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Riwayat Transaksi Terbaru</h2>
        <div className="divide-y">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                {tx.type === "masuk" ? (
                  <ArrowDownCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowUpCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className="font-medium text-gray-800">
                    {tx.type === "masuk" ? "Saldo Masuk" : "Penarikan"}
                  </p>
                  <p className="text-xs text-gray-500">{ new Date(tx.tanggal).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === "masuk" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "masuk" ? "+" : "-"}Rp {tx.saldo.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-500">Berhasil</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default RiwayatTransaksi;