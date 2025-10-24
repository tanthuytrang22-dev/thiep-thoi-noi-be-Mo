import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [images] = useState([
  "https://i.imgur.com/abc123.jpg", // Ảnh 1
  "https://i.imgur.com/def456.jpg", // Ảnh 2
  "https://i.imgur.com/ghi789.jpg", // Ảnh 3
  "https://i.imgur.com/jkl012.jpg", // Ảnh 4
  "https://i.imgur.com/mno345.jpg", // Ảnh 5
  "https://i.imgur.com/pqr678.jpg", // Ảnh 6
  "https://i.imgur.com/stu901.jpg", // Ảnh 7
  "https://i.imgur.com/vwx234.jpg", // Ảnh 8
  "https://i.imgur.com/yzA567.jpg", // Ảnh 9
  "https://i.imgur.com/Bcd890.jpg", // Ảnh 10
  "https://i.imgur.com/Efg123.jpg", // Ảnh 11
  "https://i.imgur.com/Hij456.jpg"  // Ảnh 12
]);
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.45;
      audio.play().catch(() => {});
    }
  }, []);

  // Countdown
  useEffect(() => {
    const targetDate = new Date("2025-11-02T11:30:00").getTime();
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

  // Scroll fade + glow effect
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

  // Gửi lời chúc
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish = { name: name.trim(), message: message.trim(), id: Date.now() };
    setWishes([newWish, ...wishes]);
    setName("");
    setMessage("");

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxC3P86qjQ-oQSCd5z5qWQ5B6rd2DyCIc_c9K2fqMaN50r-CoGIqmUH3zHo8l-avF6cEA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newWish.name, message: newWish.message }),
      });
      console.log("✅ Đã gửi lời chúc lên Google Sheets");
    } catch (err) {
      console.error("❌ Lỗi khi gửi lời chúc:", err);
    }
  };

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbxC3P86qjQ-oQSCd5z5qWQ5B6rd2DyCIc_c9K2fqMaN50r-CoGIqmUH3zHo8l-avF6cEA/exec");
        const data = await res.json();
        setWishes(data.reverse());
      } catch (err) {
        console.error("❌ Lỗi khi tải lời chúc:", err);
      }
    };
    fetchWishes();
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById("bgMusic");
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  // Balloon animation
  useEffect(() => {
    const colors = ["#FFB6C1", "#FFDAB9", "#E0FFFF", "#E6E6FA", "#FFFACD"];
    const newBalloons = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 90 + "%",
      size: 30 + Math.random() * 40 + "px",
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 8 + Math.random() * 6 + "s",
      delay: Math.random() * 5 + "s",
    }));
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="page">
      <div className="cloud"></div>
<div className="cloud"></div>
<div className="cloud"></div>
{/* <div className="hearts">
  {Array.from({ length: 15 }).map((_, i) => (
    <div key={i} className="heart" style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      fontSize: `${Math.random() * 12 + 10}px`
    }}>💚</div>
  ))}
</div> */}

      <div className="sparkles" aria-hidden></div>
      <div className="balloons" aria-hidden>
        {balloons.map((b, i) => (
          <div
            key={i}
            className="balloon"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              backgroundColor: b.color,
              animationDuration: b.duration,
              animationDelay: b.delay,
            }}
          />
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
            <div><strong>Ngày:</strong> 02/11/2025</div>
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
                  <span>{Object.values(timeLeft)[i]}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="done">🎂 Hôm nay là ngày thôi nôi của bé Mỡ rồi 💛</p>
          )}
        </section>

        <section className="gallery card fade-section">
  <h2>📸 Album Bé Mỡ (12 ảnh — thay link khi có)</h2>
  <div className="grid">
    {images.map((src, idx) => (
      <div key={idx} className="grid-item">
        {src ? (
          <img src={src} alt={`bé mỡ ${idx + 1}`} />
        ) : (
          <div className="placeholder">
            <div className="placeholder-text">
              Ảnh {idx + 1}<br />đang cập nhật ✨
            </div>
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
      {/* --- cloud footer: dán vào đây --- */}
      <div className="cloud-footer"></div>

      {/* ✅ Style mới tinh chỉnh */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;700&family=Pacifico&display=swap');
      `}</style>

      <style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;700&family=Pacifico&display=swap');

  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  .page {
    font-family: 'Fredoka', sans-serif;
    background: 
  radial-gradient(circle at top left, #d8ffd9 0%, #c7ffcf 80%, transparent 100%),
  linear-gradient(180deg, #eaffd5 0%, #c7ffcf 50%, #e8fff2 100%);
background-repeat: no-repeat;
background-attachment: fixed;


    color: #234927;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 80px;
    overflow-x: hidden;
  }

  /* 🌤️ MÂY BAY NHẸ */
  .cloud {
    position: fixed;
    top: 10%;
    background: white;
    border-radius: 50px;
    box-shadow: 30px 20px 0 10px white, 60px 10px 0 15px white;
    opacity: 0.9;
    animation: floatCloud 60s linear infinite;
    z-index: 0;
  }
  .cloud:nth-child(1) { top: 10%; left: -100px; width: 100px; height: 40px; animation-delay: 0s; }
  .cloud:nth-child(2) { top: 25%; left: -200px; width: 120px; height: 50px; animation-delay: 10s; }
  .cloud:nth-child(3) { top: 40%; left: -180px; width: 140px; height: 55px; animation-delay: 20s; }

  @keyframes floatCloud {
    0% { transform: translateX(0); }
    100% { transform: translateX(130vw); }
  }

  /* 💕 TRÁI TIM RƠI NHẸ */
  .hearts {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .heart {
    position: absolute;
    top: -10px;
    color: #ffb6c1;
    opacity: 0.8;
    font-size: 18px;
    animation: fall 8s linear infinite;
  }

  @keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }

  /* HERO */
  .hero { padding: 40px 20px 20px; position: relative; z-index: 1; }
  .title {
    font-family: 'Pacifico', cursive;
    font-size: 2.3rem;
    color: #4cb963;
    text-shadow: 1px 2px 3px rgba(0,0,0,0.08);
    margin-bottom: 10px;
  }
  .subtitle { font-size: 1rem; color: #333; margin-bottom: 16px; }

  .avatar { position: relative; width: 140px; height: 140px; margin: 0 auto; }
  .avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: #777;
  }
  .avatar-ring {
    position: absolute;
    top: -8px;
    left: -8px;
    width: 156px;
    height: 156px;
    border-radius: 50%;
    border: 3px dashed #8de88a;
    animation: spin 10s linear infinite;
  }
  .avatar-glow {
  box-shadow: 0 0 28px rgba(76, 185, 99, 0.5); /* ánh sáng xanh lá */
}
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* CARD */
  section {
    width: 90%;
    max-width: 960px;
    margin: 28px auto;
    padding: 22px 20px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    position: relative;
    z-index: 1;
  }
  section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    font-family: 'Pacifico', cursive;
    color: #4cb963;
    font-size: 1.6rem;
    margin-bottom: 12px;
  }

  .info-list div { margin-bottom: 6px; font-size: 1rem; }

  /* COUNTDOWN */
  .countdown-box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .time-box {
    background: #e6fff8;
    padding: 12px;
    border-radius: 14px;
    min-width: 70px;
  }
  .time-box span {
    display: block;
    font-weight: 700;
    font-size: 1.6rem;
    color: #4cb963;
  }
  .time-box p { margin: 0; font-size: 0.9rem; color: #5f7d5f; }

  /* ALBUM */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 14px;
  }
  .grid-item img {
  width: 100%;
  height: 140px;        /* cố định chiều cao */
  object-fit: cover;    /* tự căn vừa khung, không méo hình */
  border-radius: 12px;  /* bo góc */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;  /* để hiệu ứng hover mượt */
}

.grid-item img:hover {
  transform: scale(1.05);          /* phóng nhẹ */
  box-shadow: 0 0 12px #66bb6a;    /* viền sáng xanh lá cây */
}

  .placeholder {
    width: 100%;
    height: 100px;
    border-radius: 12px;
    background: #e6f9f3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .placeholder-text { color: #7aa59a; font-size: 0.85rem; }

  /* FORM */
  .wish-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wish-form input,
  .wish-form textarea {
    width: 100%;
    max-width: 480px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #b9e6da;
    margin-bottom: 10px;
    font-family: 'Fredoka', sans-serif;
  }
  .btn-send {
    background: linear-gradient(180deg,#a9f7a3,#4cb963);
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .btn-send:hover { transform: scale(1.05); }
.btn-send:hover {
  transform: scale(1.05);
  box-shadow: 0 0 14px rgba(76, 185, 99, 0.4);
}

  .messages .message {
    background: #edfffa;
    border-left: 4px solid #4cb963;
    border-radius: 12px;
    padding: 10px;
    margin-top: 8px;
    text-align: left;
  }

  /* MUSIC BUTTON */
  .music-btn {
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: #9ae5d0;
    color: white;
    font-size: 1.3rem;
    box-shadow: 0 8px 22px rgba(0,0,0,0.18);
    cursor: pointer;
    z-index: 999;
    transition: transform 0.2s;
  }
  .music-btn:hover { transform: scale(1.1); }

  /* BALLOONS (giữ nguyên) */
  .balloons { position: fixed; width: 100%; height: 100%; top:0; left:0; pointer-events:none; overflow: hidden; }
  .balloon { position: absolute; bottom: -60px; border-radius: 50%; opacity: 0.85; animation-name: floatUp; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity:0.7; }
    50% { transform: translateY(-50vh) rotate(15deg); opacity:0.85; }
    100% { transform: translateY(-110vh) rotate(-10deg); opacity:0; }
  }

  /* ☁️ MÂY DƯỚI CHÂN TRANG */
.cloud-footer,
.footer,
.album,
.content {
  background: transparent !important;
  z-index: 2;
  position: relative;
}


@keyframes waveCloud {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

`}</style>

    </div>
  );
}
