import { useEffect, useState } from "react";



export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [images] = useState(Array.from({ length: 10 }).map(() => ""));
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

  // Handle wish submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name.trim() || !message.trim()) return;

  const newWish = { name: name.trim(), message: message.trim(), id: Date.now() };
  setWishes([newWish, ...wishes]);
  setName("");
  setMessage("");

  // ✅ Gửi dữ liệu lên Google Sheets
  try {
    await fetch("https://script.google.com/macros/s/AKfycbxC3P86qjQ-oQSCd5z5qWQ5B6rd2DyCIc_c9K2fqMaN50r-CoGIqmUH3zHo8l-avF6cEA/exec", {
      method: "POST",
      mode: "no-cors", // tránh lỗi CORS
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
      setWishes(data.reverse()); // đảo ngược để lời mới lên đầu
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

      {/* ✅ CSS - đã căn giữa form lời chúc */}
	  import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx>{`
	  
        .page { 
  font-family: "Poppins", "Dancing Script", system-ui, sans-serif; 
}

        .hero { padding: 40px 20px 20px; }
        .title {
  font-family: "Dancing Script", cursive;
  font-size: 2.8rem;
  color: #1b5e20;
  text-shadow: 2px 2px 8px rgba(255, 223, 186, 0.7);
}
.subtitle {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

        .avatar { position: relative; width: 140px; height: 140px; margin: 0 auto; }
        .avatar-inner { width: 100%; height: 100%; border-radius: 50%; background: #fffbe6; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: #5a5a5a; text-align: center; padding: 8px; }
        .avatar-ring { position: absolute; top: -8px; left: -8px; width: 156px; height: 156px; border-radius: 50%; border: 3px solid #ffe082; z-index: -1; }
        .avatar-glow { position: absolute; top: -16px; left: -16px; width: 172px; height: 172px; border-radius: 50%; box-shadow: 0 0 28px rgba(255, 230, 90, 0.5); z-index: -2; }

        section { width: 90%; max-width: 960px; margin: 28px auto; padding: 22px 20px; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); opacity: 0; transform: translateY(30px); transition: all 1s ease; background: #fffdf5; }
        section.visible { opacity: 1; transform: translateY(0); animation: glow 2.8s ease-out; }
        @keyframes glow { 0% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); } 25% { box-shadow: 0 0 18px rgba(255, 243, 150, 0.6); } 50% { box-shadow: 0 0 28px rgba(255, 230, 90, 0.8); } 100% { box-shadow: 0 0 12px rgba(255, 255, 255, 0.2); } }

        .countdown-box { display: flex; justify-content: center; flex-wrap: wrap; gap: 18px; margin-top: 14px; }
        .time-box { background: linear-gradient(180deg, #fffef0, #fffde7); border: 2px solid #f3e5ab; border-radius: 14px; padding: 14px 20px; min-width: 70px; box-shadow: 0 6px 16px rgba(0,0,0,0.05), 0 0 12px rgba(255,235,59,0.3); }
        .time-box span { font-size: 1.9rem; font-weight: 700; color: #2e7d32; }
        .time-box p { margin: 0; color: #5f7d5f; font-size: 0.95rem; }

        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; margin-top: 12px; }
        .grid-item img { width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .placeholder { width: 100%; height: 100px; border-radius: 12px; background: #fff7e6; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .placeholder-text { font-size: 0.85rem; color: #7a7a7a; }

        /* ✅ Form lời chúc căn giữa đẹp */
        .wish-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .wish-form input,
        .wish-form textarea {
          width: 100%;
          max-width: 500px;
          box-sizing: border-box;
          padding: 10px 12px;
          margin-bottom: 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 0.95rem;
        }

        .btn-send {
          background: linear-gradient(180deg,#81c784,#5aa25a);
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s;
          align-self: center;
        }

        .btn-send:hover { transform: scale(1.05); }

        .messages .message {
          background: #fffde7;
          border-radius: 12px;
          padding: 10px 14px;
          margin-top: 8px;
          text-align: left;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .music-btn { position: fixed; right: 18px; bottom: 18px; width: 56px; height: 56px; border-radius: 50%; border: none; background: linear-gradient(180deg,#81c784,#5aa25a); color: white; font-size: 1.3rem; box-shadow: 0 8px 22px rgba(0,0,0,0.18); cursor: pointer; z-index: 999; transition: transform 0.2s; }
        .music-btn:hover { transform: scale(1.1); }

        /* Balloon animation */
        .balloons { position: fixed; width: 100%; height: 100%; top:0; left:0; pointer-events:none; overflow: hidden; }
        .balloon { position: absolute; bottom: -60px; border-radius: 50%; opacity: 0.85; animation-name: floatUp; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity:0.7; }
          50% { transform: translateY(-50vh) rotate(15deg); opacity:0.85; }
          100% { transform: translateY(-110vh) rotate(-10deg); opacity:0; }
        }
      `}</style>
    </div>
  );
}
