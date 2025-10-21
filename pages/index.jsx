import { useEffect, useState } from "react";

export default function InvitationCard() {
  const childName = "Bé Minh Triết (Mỡ)";
  const eventDateISO = "2025-11-02T11:30:00+07:00";
  const eventPlace = "Khu Chung cư đường Tân An 4";
  const inviteLine = "Mời cô chú, anh chị cùng đến chung vui cùng bé Mỡ tròn 1 tuổi";
  const musicFile = "/happy-birthday.mp3";

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
      <audio src={musicFile} autoPlay loop muted={!playing} />

      <div className="relative max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-green-200">
        <div className="p-8 md:p-12 relative z-10">
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

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 text-green-800">
            {timeLeft ? (
              <div className="flex items-center gap-4 justify-center">
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
              <div className="text-green-800 font-semibold text-center">Sự kiện đã bắt đầu — hẹn gặp tại chỗ!</div>
            )}
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => setPlaying(!playing)} className={`px-4 py-2 rounded-md border ${playing ? 'bg-green-600 text-white' : 'bg-white text-green-700'}`}>
              {playing ? 'Tắt nhạc' : 'Bật nhạc'}
            </button>
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg border border-green-50">
            <h2 className="text-green-800 font-medium">Gửi lời chúc</h2>
            <form onSubmit={submitWish} className="mt-2 flex flex-col gap-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên" className="px-3 py-2 rounded border" />
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Lời chúc" className="px-3 py-2 rounded border" />
              <button className="px-3 py-2 bg-green-600 text-white rounded">Gửi</button>
            </form>
          </div>

          <div className="mt-6 grid gap-3">
            {wishes.length === 0 && <div className="text-sm text-green-500 text-center">Chưa có lời chúc nào — bạn là người đầu tiên!</div>}
            {wishes.map((w) => (
              <div key={w.id} className="p-3 bg-white rounded-lg border border-green-50 shadow-sm">
                <div className="text-sm font-semibold text-green-800">{w.name}</div>
                <div className="mt-1 text-sm text-green-700">{w.message}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-green-600">Thiệp mời tự động — mang theo nụ cười nhé 😊</div>
        </div>
      </div>
    </div>
  );
}
