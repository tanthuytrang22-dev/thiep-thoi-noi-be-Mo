import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [images] = useState(Array.from({ length: 10 }).map(() => ""));

  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.45;
      audio.play().catch(() => {});
    }
  }, []);

  // Countdown
  useEffect(() => {
    const targetDate = new Date("2024-11-02T11:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll fade-in effect
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const reveal = () => {
      const trigger = window.innerHeight * 0.85;
      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        if (top < trigger) sec.classList.add("visible");
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
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

        <div className="avatar">
          <div className="avatar-ring" />
          <div className="avatar-inner">Ảnh bé Mỡ đang cập nhật ✨</div>
          <div className="avatar-glow" />
        </div>
      </header>

      <main className="content">
        <section className="info card fade-section">
          <h2>🍼 Thông Tin Bữa Tiệc</h2>
          <div className="info-list">
            <div><strong>Bé:</strong> Minh Triết (Mỡ)</div>
            <div><strong>Ngày:</strong> 02/11/2024</div>
            <div><strong>Thời gian:</strong> 11h30</div>
            <div><strong>Địa điểm:</strong> Khu Chung cư đường Tân An 4</div>
          </div>
        </section>

        <section className="countdown card fade-section">
          <h2>⏳ Đếm ngược đến ngày thôi nôi bé Mỡ 🎉</h2>
          {timeLeft ? (
            <div className="countdown-box">
              {["Ngày", "Giờ", "Phút", "Giây"].map((label, i) => (
                <div className="time-box" key={label}>
                  <span>
                    {Object.values(timeLeft)[i]}
                  </span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="done">🎂 Hôm nay là ngày thôi nôi của bé Mỡ rồi 💛</p>
          )}
        </section>

        <section className="gallery card fade-section">
          <h2>📸 Album Bé Mỡ (10 ảnh — thay link khi có)</h2>
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
        </section>

        <section className="wishes card fade-section">
          <h2>💌 Gửi Lời Chúc Đến Bé Mỡ</h2>
          <form onSubmit={handleSubmit} className="wish-form">
            <input type="text" placeholder="Tên của bạn" value={name} onChange={(e) => setName(e.target.value)} required />
            <textarea placeholder="Lời chúc dễ thương..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} required />
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

        <section className="thanks card fade-section">
          <h2>❤️ Cảm ơn</h2>
          <p>Gia đình cảm ơn mọi người đã dành thời gian và tấm lòng cho bé Mỡ 💕</p>
        </section>
      </main>

      <audio id="bgMusic" loop src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_45b8e29c10.mp3?filename=happy-birthday-piano-14175.mp3" />
      <button className="music-btn" onClick={toggleMusic}>{isPlaying ? "🎵" : "🔇"}</button>

      <style jsx>{`
        .page {
          font-family: "Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          background: linear-gradient(180deg, #e0f8dc 0%, #fff8e1 100%);
          color: #234927;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 60px;
        }

        section {
          width: 90%;
          max-width: 960px;
          margin: 20px auto;
          padding: 20px 16px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .info.card { background: #ffffffd9; }
        .countdown.card { background: #fffbeecf; }
        .gallery.card { background: #f4ffefcf; }
        .wishes.card { background: #fffde7cf; }
        .thanks.card { background: #f8fff1cf; }

        .countdown-box {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 10px;
        }
        .time-box {
          background: linear-gradient(180deg, #fffff0, #fffde7);
          border: 2px solid #f3e5ab;
          border-radius: 14px;
          padding: 12px 18px;
          min-width: 70px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.05), 0 0 10px rgba(255,235,59,0.3);
        }
        .time-box span {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2e7d32;
        }
        .time-box p { margin: 0; color: #5f7d5f; font-size: 0.9rem; }

        .music-btn {
          position: fixed;
          right: 18px;
          bottom: 18px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(180deg,#81c784,#5aa25a);
          color: white;
          font-size: 1.25rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          cursor: pointer;
          z-index: 999;
        }
      `}</style>
    </div>
  );
}
