import { useState } from "react";
import { Star, Quote, UserCircle2, MessageSquare, Send } from "lucide-react";

const RatingContent = () => {
  const [selectedReply, setSelectedReply] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});

  const testimonials = [
    {
      id: 1,
      nama: "Ayu Lestari",
      peran: "Murid",
      rating: 5,
      pesan:
        "Belajar di platform ini sangat menyenangkan! Gurunya sabar dan materi mudah dipahami.",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      peran: "Guru",
      rating: 4,
      pesan:
        "Sistemnya sangat membantu saya mengatur jadwal dan memantau perkembangan murid.",
    },
    {
      id: 3,
      nama: "Rizky Ramadhan",
      peran: "Murid",
      rating: 5,
      pesan:
        "Tampilan modern dan fitur lengkap membuat pengalaman belajar jadi seru!",
    },
  ];

  const handleReply = (id) => {
    if (selectedReply === id) {
      setSelectedReply(null);
      setReplyText("");
    } else {
      setSelectedReply(id);
      setReplyText(replies[id] || "");
    }
  };

  const handleSendReply = (id) => {
    if (replyText.trim() === "") return;
    setReplies({ ...replies, [id]: replyText });
    setSelectedReply(null);
    setReplyText("");
  };

  return (
    <div className="py-16 p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <Quote className="w-8 h-8 text-green-600" /> Testimoni & Rating Aplikasi
        </h1>
        <p className="text-gray-600">
          Lihat pengalaman pengguna dan tanggapan dari admin.
        </p>
      </header>

      {/* Daftar Testimoni */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="relative bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all duration-200"
          >
            {/* Header Card */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <UserCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{item.nama}</h2>
                <p className="text-sm text-gray-500">{item.peran}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < item.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Pesan */}
            <p className="text-gray-700 italic leading-relaxed mb-4">
              “{item.pesan}”
            </p>

            {/* Tombol Balas */}
            <button
              onClick={() => handleReply(item.id)}
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition"
            >
              <MessageSquare className="w-4 h-4" />
              {selectedReply === item.id ? "Batal Balas" : "Balas Admin"}
            </button>

            {/* Form Balas */}
            {selectedReply === item.id && (
              <div className="mt-3 bg-gray-50 p-3 rounded-xl border space-y-3 animate-fadeIn">
                <textarea
                  rows="3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan Anda..."
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSendReply(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    <Send className="w-4 h-4" /> Kirim Balasan
                  </button>
                </div>
              </div>
            )}

            {/* Balasan Admin */}
            {replies[item.id] && (
              <div className="mt-4 border-t pt-3 text-sm bg-green-50 rounded-xl p-3">
                <p className="text-green-700 font-medium flex items-center gap-1 mb-1">
                  <MessageSquare className="w-4 h-4" /> Balasan Admin:
                </p>
                <p className="text-gray-700">{replies[item.id]}</p>
              </div>
            )}

            {/* Quote Decorative */}
            <Quote className="absolute top-4 right-4 w-5 h-5 text-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingContent;
