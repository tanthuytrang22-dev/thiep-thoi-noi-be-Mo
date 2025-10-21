import { useEffect, useState } from "react";

export default function Home() {
  // Event details (easy to edit)
  const childName = "Bé Minh Triết (Mỡ)";
  const eventDateISO = "2025-11-02T11:30:00+07:00"; // YYYY-MM-DDTHH:mm:ss+07:00
  const eventPlace = "Khu Chung cư đường Tân An 4";
  const inviteLine = "Mời cô chú, anh chị cùng đến chung vui cùng bé Mỡ tròn 1 tuổi";
  const theme = "tropical-green";
  const musicFile = "/happy-birthday.mp3"; // put your mp3 in public/ folder or replace with full URL

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [wishes, setWishes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishes_minhtriet")) || [];
    } catch (e) {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishes_minhtriet", JSON.stringify(wishes));
  }, [wishes]);

  function getTimeLeft() {
    const now = new Date();
    const target = new Date(eventDateISO);
    const diff = target - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  function submitWish(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newW = { id: Date.now(), name: name.trim(), message: message.trim() };
    setWishes([newW, ...wishes]);
    setName("");
    setMessage("");
  }

  function clearWishes() {
    if (confirm("Xóa toàn bộ lời chúc?")) setWishes([]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
      <audio src={musicFile} autoPlay loop muted={!playing} id="bg-music" />

      {/* Card */}
      <div className="relative max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-green-200">
        {/* Pastel balloons (absolute) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-bubble absolute left-6 -top-8 opacity-80">
            <div className="w-14 h-18 rounded-full transform -rotate-12 balloon pastel-1"></div>
          </div>
          <div className="animate-bubble2 absolute right-10 -top-6 opacity-80">
            <div className="w-16 h-20 rounded-full balloon pastel-2"></div>
          </div>
          <div className="animate-bubble3 absolute left-40 top-6 opacity-80">
            <div className="w-12 h-16 rounded-full balloon pastel-3"></div>
          </div>
          <div className="absolute right-40 bottom-6 opacity-70">
            <div className="w-20 h-24 rounded-full balloon pastel-4"></div>
          </div>
        </div>

        <div className="p-8 md:p-12 relative z-10">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-green-800">{childName}</h1>
              <p className="mt-2 text-green-700/90">{inviteLine}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-white border border-green-100">
                  <div className="text-xs text-green-500 uppercase">Ngày</div>
                  <div className="mt-1 font-semibold">02/11/2025</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-green-100">
                  <div className="text-xs text-green-500 uppercase">Thời gian</div>
                  <div className="mt-1 font-semibold">11:30</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-green-100">
                  <div className="text-xs text-green-500 uppercase">Địa điểm</div>
                  <div className="mt-1 font-semibold">{eventPlace}</div>
                </div>
              </div>

              {/* Countdown */}
              <div className="mt-6 flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200">
                  {timeLeft ? (
                    <div className="flex items-center gap-4 text-green-800">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.days}</div>
                        <div className="text-xs">ngày</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
                        <div className="text-xs">giờ</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
                        <div className="text-xs">phút</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</div>
                        <div className="text-xs">giây</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-green-800 font-semibold">Sự kiện đã bắt đầu — hẹn gặp tại chỗ!</div>
                  )}
                </div>

                <button
                  onClick={() => setPlaying((s) => !s)}
                  className={`px-4 py-2 rounded-md border ${playing ? "bg-green-600 text-white" : "bg-white text-green-700"}`}>
                  {playing ? "Tắt nhạc" : "Bật nhạc"}
                </button>
              </div>
            </div>

            {/* Right column: image + wishes */}
            <div className="w-44 md:w-56 flex-shrink-0">
              <div className="rounded-xl overflow-hidden border border-green-100 shadow-sm">
                <img src="/baby-sample.jpg" alt="bé" className="w-full h-40 object-cover" />
              </div>

              <div className="mt-4 p-3 bg-white rounded-lg border border-green-50">
                <div className="text-sm font-medium text-green-800">Gửi lời chúc</div>
                <form onSubmit={submitWish} className="mt-2 flex flex-col gap-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên" className="px-3 py-2 rounded border" />
                  <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Lời chúc" className="px-3 py-2 rounded border" />
                  <button className="mt-1 px-3 py-2 bg-green-600 text-white rounded">Gửi</button>
                </form>
                <div className="mt-3 text-xs text-green-600">Lời chúc đã gửi: {wishes.length}</div>
                <button onClick={clearWishes} className="mt-2 text-xs underline">Xóa tất cả</button>
              </div>
            </div>
          </div>

          {/* Wishes list */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-green-700">Lời chúc từ khách mời</h3>
            <div className="mt-3 grid gap-3">
              {wishes.length === 0 && <div className="text-sm text-green-500">Chưa có lời chúc nào — bạn là người đầu tiên!</div>}
              {wishes.map((w) => (
                <div key={w.id} className="p-3 bg-white rounded-lg border border-green-50 shadow-sm">
                  <div className="text-sm font-semibold text-green-800">{w.name}</div>
                  <div className="mt-1 text-sm text-green-700">{w.message}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-green-600">Thiệp mời tự động — mang theo nụ cười nhé 😊</div>
        </div>
      </div>

      {/* Inline styles for pastel balloons + animations */}
      <style jsx>{`
        .balloon { box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
        .pastel-1 { background: linear-gradient(135deg,#c9f7d6,#f0fff4); }
        .pastel-2 { background: linear-gradient(135deg,#d9f1ff,#f3fbff); }
        .pastel-3 { background: linear-gradient(135deg,#fff3d9,#fffdf3); }
        .pastel-4 { background: linear-gradient(135deg,#fde5ff,#fff6fb); }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.95; }
          50% { transform: translateY(-10px) scale(1.02); }
          100% { transform: translateY(-200px) scale(0.95); opacity: 0.6; }
        }
        .animate-bubble { animation: floatUp 12s linear infinite; }
        .animate-bubble2 { animation: floatUp 14s linear infinite; }
        .animate-bubble3 { animation: floatUp 10s linear infinite; }

        /* small responsive tweaks */
        @media (max-width: 768px) {
          .animate-bubble, .animate-bubble2, .animate-bubble3 { display: none; }
        }
      `}</style>

      {/* Small global styles (Tailwind assumed available) */}
      <style jsx global>{`
        html, body, #__next { height: 100%; }
      `}</style>
    </div>
  );
}
