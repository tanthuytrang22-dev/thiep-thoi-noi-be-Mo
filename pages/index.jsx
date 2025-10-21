import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [images, setImages] = useState(Array.from({ length: 10 }).map(() => ""));
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Countdown setup
  useEffect(() => {
    const target = new Date("2024-11-02T11:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, mins, secs });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.45;
      audio.play().catch(() => {});
    }
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
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="page">
      <div className="sparkles" aria-hidden />
      <div className="balloons" aria-hidden>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`balloon b${i + 1}`} />
        ))}
      </div>

      <header className="hero">
        <h1 className="title">Thiệp Mời Thôi Nôi Bé Mỡ 🎂</h1>
        <p className="subtitle">Trân trọng kính mời mọi người đến chung vui cùng bé Minh Triết 💚</p>

        {/* Countdown */}
        <div className="countdown">
          <h3>⏳ Còn lại:</h3>
          <div className="count-box">
            <div className="time">
              <span>{timeLeft.days}</span>
              <small>Ngày</small>
            </div>
            <div className="time">
              <span>{timeLeft.hours}</span>
              <small>Giờ</small>
            </div>
            <div className="time">
              <span>{timeLeft.mins}</span>
              <small>Phút</small>
            </div>
            <div className="time">
              <span>{timeLeft.secs}</span>
              <small>Giây</small>
            </div>
          </div>
        </div>

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

        <section className="gallery card">
          <h2>📸 Album bé Mỡ</h2>
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
          <form onSubmit={handleSubmit} className="wish-form">
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

      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? "🎵" : "🔇"}
      </button>

      <style jsx>{`
        /* Giữ nguyên phần CSS cũ, chỉ thêm countdown */
        .countdown {
          margin: 16px auto 22px;
          text-align: center;
          color: #2f5c2f;
          animation: fadeIn 1s ease;
        }
        .count-box {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
        }
        .time {
          background: linear-gradient(180deg, #f7fff7, #e9ffd8);
          border-radius: 12px;
          padding: 10px 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          min-width: 64px;
        }
        .time span {
          display: block;
          font-size: 1.3rem;
          font-weight: 700;
          color: #3e8a3e;
        }
        .time small {
          font-size: 0.8rem;
          color: #6b856b;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
