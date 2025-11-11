import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet, Users, Star, BookOpen, TrendingUp, Settings, Clock, CheckCircle } from "lucide-react";

const Content = () => {
  const [balance, setBalance] = useState(2450000);


  const transactions = [
    { id: 1, type: "Masuk", amount: 750000, date: "10 Nov 2025", status: "Berhasil" },
    { id: 2, type: "Keluar", amount: 300000, date: "09 Nov 2025", status: "Diproses" },
    { id: 3, type: "Masuk", amount: 1250000, date: "08 Nov 2025", status: "Berhasil" },
  ];

  const withdrawRequests = [
    { id: 1, name: "Ahmad Rizki", amount: 500000, status: "Menunggu" },
    { id: 2, name: "Siti Nurhaliza", amount: 750000, status: "Berhasil" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
     {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Saldo</h1>
        <p className="text-gray-600">Pantau dan kelola saldo serta transaksi sistem</p>
      </header>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="mb-2">
            <h3 className="font-semibold text-sm">Saldo Sistem Tersedia</h3>
            <p className="text-3xl font-bold mt-1">Rp {balance.toLocaleString("id-ID")}</p>
            <p className="text-sm opacity-80 mt-1">Terakhir diperbarui: 10 Nov 2025, 14:30</p>
          </div>
          <Wallet className="w-10 h-10 opacity-80" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Saldo Masuk</p>
            <ArrowDownCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">Rp 2,5M</p>
          <p className="text-xs text-green-600">+12% dari bulan lalu</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Penarikan</p>
            <ArrowUpCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">Rp 800K</p>
          <p className="text-xs text-red-600">+5% dari bulan lalu</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Permintaan Pending</p>
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">3</p>
          <p className="text-xs text-yellow-600">Menunggu approval</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Transaksi Hari Ini</p>
            <CheckCircle className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">12</p>
          <p className="text-xs text-blue-600">5 masuk, 7 keluar</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex flex-col items-center p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
          <BookOpen className="w-7 h-7 mb-2 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Kelola Transaksi</span>
        </button>
        <button className="flex flex-col items-center p-5 bg-green-50 rounded-xl hover:bg-green-100 transition">
          <Users className="w-7 h-7 mb-2 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Kelola Pengguna</span>
        </button>
        <button className="flex flex-col items-center p-5 bg-purple-50 rounded-xl hover:bg-purple-100 transition">
          <TrendingUp className="w-7 h-7 mb-2 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Lihat Laporan</span>
        </button>
        <button className="flex flex-col items-center p-5 bg-orange-50 rounded-xl hover:bg-orange-100 transition">
          <Settings className="w-7 h-7 mb-2 text-orange-600" />
          <span className="text-sm font-medium text-gray-700">Pengaturan</span>
        </button>
      </div>

      {/* Withdraw Requests */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Permintaan Penarikan</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2 text-left">Nama</th>
              <th className="py-2 text-left">Jumlah</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawRequests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{req.name}</td>
                <td className="py-2">Rp {req.amount.toLocaleString("id-ID")}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      req.status === "Berhasil"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Riwayat Transaksi</h2>
        <div className="divide-y">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                {tx.type === "Masuk" ? (
                  <ArrowDownCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowUpCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className="font-medium text-gray-800">
                    {tx.type === "Masuk" ? "Saldo Masuk" : "Penarikan"}
                  </p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === "Masuk" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "Masuk" ? "+" : "-"}Rp {tx.amount.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-500">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
