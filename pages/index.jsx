import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);

  // 10 placeholder image slots
  const [images, setImages] = useState(Array.from({ length: 10 }).map(() => ""));

  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.45;
      audio.play().catch(() => {});
    }

    // Countdown
    const target = new Date("2024-11-02T11:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(timer);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "🎉 Hôm nay là ngày thôi nôi bé Mỡ rồi 💛";
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (document.getElementById("days")) {
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newWish = { name: name.trim(), message: message.trim(), id: Date.now() };
    setWishes([newWish, ...wishes]);
    setName("");
    setMessage("");
  };

  const toggleMusic = () => {
    const audio = document.getElementById("bgMusic");
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="page">
      {/* Sparkles */}
      <div className="sparkles" aria-hidden />

      {/* Floating balloons */}
      <div className="balloons" aria-hidden>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`balloon b${i + 1}`} />
        ))}
      </div>

      <header className="hero">
        <h1 className="title">Thiệp Mời Thôi Nôi Bé Mỡ 🎂</h1>
        <p className="subtitle">Trân trọng kính mời mọi người đến chung vui cùng bé Minh Triết 💚</p>

        <div className="avatar">
          <div className="avatar-ring" />
          <div className="avatar-inner">Ảnh bé Mỡ đang cập nhật ✨</div>
          <div className="avatar-glow" />
        </div>
      </header>

      <main className="content">
        <section className="info card">
          <h2>🍼 Thông Tin Bữa Tiệc</h2>
          <div className="info-list">
            <div><strong>Bé:</strong> Minh Triết (Mỡ)</div>
            <div><strong>Ngày:</strong> 02/11/2024</div>
            <div><strong>Thời gian:</strong> 11h30</div>
            <div><strong>Địa điểm:</strong> Khu Chung cư đường Tân An 4</div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="countdown card">
          <h2 className="countdown-title">⏳ Đếm ngược đến ngày thôi nôi bé Mỡ 🎉</h2>
          <div id="countdown" className="countdown-box">
            <div className="time-box">
              <span id="days">00</span>
              <p>Ngày</p>
            </div>
            <div className="time-box">
              <span id="hours">00</span>
              <p>Giờ</p>
            </div>
            <div className="time-box">
              <span id="minutes">00</span>
              <p>Phút</p>
            </div>
            <div className="time-box">
              <span id="seconds">00</span>
              <p>Giây</p>
            </div>
          </div>
        </section>

        <section className="gallery card">
          <h2>📸 Album bé Mỡ (10 ảnh — thay link khi có)</h2>
          <div className="grid">
            {images.map((src, idx) => (
              <div key={idx} className="grid-item">
                {src ? (
                  <img src={src} alt={`bé mỡ ${idx + 1}`} />
                ) : (
                  <div className="placeholder">
                    <div className="placeholder-text">Ảnh {idx + 1}<br/>đang cập nhật ✨</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="hint">Mẹ/ba chỉ cần cập nhật URL ảnh tương ứng (mình hướng dẫn nếu cần).</p>
        </section>

        <section className="wishes card">
          <h2>💌 Gửi Lời Chúc Đến Bé Mỡ</h2>
          <form onSubmit={handleSubmit} className="wish-form" aria-label="Gửi lời chúc">
            <input
              type="text"
              placeholder="Tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Lời chúc dễ thương..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              required
            />
            <button type="submit" className="btn-send">Gửi lời chúc 💚</button>
          </form>

          <div className="messages">
            {wishes.length === 0 ? (
              <p className="muted">Chưa có lời chúc nào — bạn là người đầu tiên nhé!</p>
            ) : (
              wishes.map((w) => (
                <div key={w.id} className="message">
                  <strong>{w.name}</strong>
                  <div className="msg-text">{w.message}</div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="thanks card">
          <h2>❤️ Cảm ơn</h2>
          <p>Gia đình cảm ơn mọi người đã dành thời gian và tấm lòng cho bé Mỡ 💕</p>
        </section>
      </main>

      <audio
        id="bgMusic"
        loop
        src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_45b8e29c10.mp3?filename=happy-birthday-piano-14175.mp3"
      />

      <button className="music-btn" onClick={toggleMusic} aria-label="Bật/Tắt nhạc">
        {isPlaying ? "🎵" : "🔇"}
      </button>

      <style jsx>{`
        .page {
          font-family: "Quicksand", system-ui, sans-serif;
          background: linear-gradient(180deg, #e0f8dc 0%, #fff8e1 100%);
          color: #234927;
          min-height: 100vh;
        }

        /* Countdown styling */
        .countdown-title {
          color: #3e8a3e;
          text-align: center;
          margin-bottom: 10px;
          font-family: "Pacifico", cursive;
        }
        .countdown-box {
          display: flex;
          justify-content: center;
          gap: 12px;
          text-align: center;
          animation: fadeIn 1s ease;
        }
        .time-box {
          background: linear-gradient(180deg, #f5ffe8, #fffde7);
          border: 2px solid #dcedc8;
          border-radius: 12px;
          padding: 10px 14px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
          animation: float 3s ease-in-out infinite;
        }
        .time-box span {
          font-size: 1.8rem;
          font-weight: 700;
          color: #388e3c;
          display: block;
        }
        .time-box p {
          margin: 0;
          color: #5f7d5f;
          font-size: 0.8rem;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
