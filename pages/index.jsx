import React, { useEffect, useState, useRef } from "react";
import { MapPin, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function BirthdayCard() {
  const mainImage =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1";

  const gallery = new Array(15).fill(0).map((_, i) => `https://images.unsplash.com/photo-1516685018646-549d3b4b9b9f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=${i}`);

  const targetDate = new Date("2025-11-02T00:00:00+07:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [wishes, setWishes] = useState(() => {
    try {
      const raw = localStorage.getItem("minhtriet_wishes");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("minhtriet_wishes", JSON.stringify(wishes));
    } catch (e) {}
  }, [wishes]);

  function getTimeLeft() {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  }

  function submitWish(e) {
    e.preventDefault();
    if (!name.trim() && !message.trim()) return;
    const newWish = {
      id: Date.now(),
      name: name.trim() || "Khách mời",
      message: message.trim(),
      time: new Date().toISOString(),
    };
    setWishes((s) => [newWish, ...s]);
    setName("");
    setMessage("");
  }

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  // Hiệu ứng bóng bay pastel gradient
  const pastelGradients = [
    "linear-gradient(135deg, #A7F3D0 0%, #FDE68A 100%)",
    "linear-gradient(135deg, #93C5FD 0%, #FBCFE8 100%)",
    "linear-gradient(135deg, #FDE68A 0%, #A5B4FC 100%)",
    "linear-gradient(135deg, #F9A8D4 0%, #6EE7B7 100%)",
  ];

  const Balloons = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-10 rounded-full shadow-md"
            initial={{ y: "100vh", x: Math.random() * window.innerWidth, opacity: 0 }}
            animate={{
              y: ["100vh", "-10vh"],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              background: pastelGradients[i % pastelGradients.length],
              left: Math.random() * window.innerWidth,
              filter: "blur(0.5px)",
            }}
          ></motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-white text-gray-800 relative overflow-hidden">
      <Balloons />
      <div className="max-w-4xl mx-auto p-6 sm:p-10 relative z-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800">
            Thiệp mời thôi nôi bé <span className="text-emerald-600">Minh Triết</span> 💚
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-full shadow-sm hover:brightness-95"
            >
              {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
            </button>
            <audio
              ref={audioRef}
              loop
              src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_8b4d0f6f2b.mp3?filename=light-piano-118740.mp3"
            />
          </div>
        </header>

        {/* Nội dung thiệp */}
        <section className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="md:col-span-2"
            >
              <img
                src={mainImage}
                alt="Bé Minh Triết"
                className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-inner"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                {gallery.slice(0, 6).map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt={`ảnh ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="p-4 flex flex-col items-center justify-center"
            >
              <div className="text-center">
                <p className="text-sm text-green-700">Countdown đến thôi nôi</p>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-2 text-3xl font-bold text-emerald-600"
                >
                  {timeLeft.days} <span className="text-base font-medium">ngày</span>
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="mt-4 grid grid-cols-3 gap-2 text-center"
                >
                  <div>
                    <div className="text-2xl font-semibold">{timeLeft.hours}</div>
                    <div className="text-xs text-gray-500">Giờ</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{timeLeft.minutes}</div>
                    <div className="text-xs text-gray-500">Phút</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{timeLeft.seconds}</div>
                    <div className="text-xs text-gray-500">Giây</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-5 text-sm bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 shadow-inner"
                >
                  <div className="flex items-center justify-center gap-2 text-green-800 font-semibold">
                    <Calendar size={18} /> Ngày 02/11/2025
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-800 font-semibold">
                    <Clock size={18} /> 11h30
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-800 font-semibold">
                    <MapPin size={18} /> Khu Chung cư đường Tân An 4
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Thư viện ảnh */}
          <div className="p-4 border-t border-green-100">
            <h3 className="text-sm font-semibold text-green-700 mb-3">Thư viện ảnh</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {gallery.map((g, i) => (
                <motion.img
                  key={i}
                  src={g}
                  alt={`g-${i}`}
                  className="w-full h-24 object-cover rounded-md"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Lời chúc */}
        <section className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-green-800 mb-2">Gửi lời chúc</h2>
          <form onSubmit={submitWish} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên bạn"
              className="sm:col-span-1 px-3 py-2 rounded-lg border border-green-200 focus:outline-none"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Lời chúc cho bé Minh Triết"
              rows={2}
              className="sm:col-span-2 px-3 py-2 rounded-lg border border-green-200 focus:outline-none"
            />

            <div className="sm:col-span-3 flex items-center justify-between mt-1">
              <div className="text-sm text-gray-600">Lời chúc sẽ được lưu công khai trên trang này.</div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md shadow-sm hover:brightness-95"
                >
                  Gửi lời chúc
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWishes([]);
                    localStorage.removeItem("minhtriet_wishes");
                  }}
                  className="px-3 py-2 border border-emerald-200 rounded-md text-sm"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-green-700 mb-3">Danh sách lời chúc ({wishes.length})</h3>
            <div className="space-y-3 max-h-64 overflow-auto pr-2">
              {wishes.length === 0 && <div className="text-sm text-gray-500">Chưa có lời chúc nào. Hãy là người đầu tiên!</div>}
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-3 bg-white rounded-lg border border-green-50 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-green-800">{w.name}</div>
                    <div className="text-xs text-gray-400">{new Date(w.time).toLocaleString()}</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">{w.message}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-6 text-center text-xs text-gray-500">Thiệp thôi nôi — created with ❤️ for Minh Triết</footer>
      </div>
    </div>
  );
}
