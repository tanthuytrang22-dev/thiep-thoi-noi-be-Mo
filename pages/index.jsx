import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [images, setImages] = useState(Array.from({ length: 10 }).map(() => ""));
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown logic
  useEffect(() => {
    const targetDate = new Date("2025-11-02T11:30:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
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

        {/* Countdown section */}
        <div className="countdown">
          {countdown.days + countdown.hours + countdown.minutes + countdown.seconds > 0 ? (
            <>
              🎉 Còn{" "}
              <span className="num">{countdown.days}</span> ngày{" "}
              <span className="num">{countdown.hours}</span> giờ{" "}
              <span className="num">{countdown.minutes}</span> phút{" "}
              <span className="num">{countdown.seconds}</span> giây đến ngày thôi nôi 🎈
            </>
          ) : (
            <span>🎊 Hôm nay là ngày thôi nôi bé Mỡ rồi! 🎂</span>
          )}
        </div>

        {/* Avatar */}
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
            <div><strong>Ngày:</strong> 02/11/2025</div>
            <div><strong>Thời gian:</strong> 11h30</div>
            <div><strong>Địa điểm:</strong> Khu Chung cư đường Tân An 4</div>
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
                    <div className="placeholder-text">Ảnh {idx + 1}<br />đang cập nhật ✨</div>
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

      {/* Audio */}
      <audio
        id="bgMusic"
        loop
        src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_45b8e29c10.mp3?filename=happy-birthday-piano-14175.mp3"
      />

      {/* Music control */}
      <button className="music-btn" onClick={toggleMusic} aria-label="Bật/Tắt nhạc">
        {isPlaying ? "🎵" : "🔇"}
      </button>

      <style jsx>{`
        .page {
          font-family: "Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          background: linear-gradient(180deg, #e0f8dc 0%, #fff8e1 100%);
          color: #234927;
          min-height: 100vh;
        }

        .countdown {
          font-size: 1.1rem;
          margin: 10px 0 20px;
          color: #2f5c2f;
          background: rgba(255, 255, 255, 0.8);
          display: inline-block;
          padding: 10px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          animation: pulse 2s infinite;
        }
        .countdown .num {
          font-weight: 700;
          color: #3e8a3e;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        /* Giữ nguyên toàn bộ phần CSS khác của bạn ở đây */
      `}</style>
    </div>
  );
}
