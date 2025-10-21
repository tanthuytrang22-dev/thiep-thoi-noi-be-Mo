import { useEffect, useState } from "react";

 

export default function Home() {

  const [wishes, setWishes] = useState([]);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [isPlaying, setIsPlaying] = useState(true);

 

  // 10 placeholder image slots (you can replace any entry with a real image URL later)

  const [images, setImages] = useState(Array.from({ length: 10 }).map(() => ""));

 

  useEffect(() => {

    const audio = document.getElementById("bgMusic");

    if (audio) {

      audio.volume = 0.45;

      // try to autoplay quietly if allowed

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

 

      {/* Floating balloons (decorative) */}

      <div className="balloons" aria-hidden>

        {[...Array(6)].map((_, i) => (

          <div key={i} className={`balloon b${i + 1}`} />

        ))}

      </div>

 

      <header className="hero">

        <h1 className="title">Thiệp Mời Thôi Nôi Bé Mỡ 🎂</h1>

        <p className="subtitle">Trân trọng kính mời mọi người đến chung vui cùng bé Minh Triết 💚</p>

 

        {/* Avatar / main photo (temporary) */}

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

            <div><strong>Địa điểm:</strong> Khu Chung cư đường Tân An 4 </div>

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

 

        /* Sparkles */

        .sparkles {

          position: fixed;

          inset: 0;

          pointer-events: none;

          z-index: 2;

        }

        .sparkles::before,

        .sparkles::after {

          content: "";

          position: absolute;

          width: 6px;

          height: 6px;

          background: radial-gradient(circle at 30% 30%, #fff, #ffd54f);

          border-radius: 50%;

          filter: blur(0.6px);

          animation: twinkle 3s infinite;

          opacity: 0.9;

        }

        .sparkles::before { left: 20%; top: 12%; animation-delay: 0s; transform: scale(.9); }

        .sparkles::after { left: 72%; top: 22%; animation-delay: 1.2s; transform: scale(1.1); }

        @keyframes twinkle {

          0% { opacity: 0; transform: scale(0.6); }

          50% { opacity: 1; transform: scale(1.2); }

          100% { opacity: 0; transform: scale(0.6); }

        }

 

        /* Balloons */

        .balloons { position: fixed; inset: 0; pointer-events: none; z-index: 1; }

        .balloon {

          position: absolute;

          bottom: -120px;

          width: 56px;

          height: 72px;

          border-radius: 50%;

          opacity: 0.95;

          box-shadow: 0 6px 12px rgba(0,0,0,0.08);

        }

        .b1 { left: 6%; background: linear-gradient(#ffeb3b,#ffd54f); animation: float1 12s infinite ease-in; }

        .b2 { left: 20%; background: linear-gradient(#81c784,#66bb6a); animation: float2 14s infinite ease-in 2s; }

        .b3 { left: 36%; background: linear-gradient(#fff176,#fff59d); animation: float1 11s infinite ease-in 1s; }

        .b4 { left: 56%; background: linear-gradient(#a5d6a7,#81c784); animation: float2 13s infinite ease-in 0.5s; }

        .b5 { left: 72%; background: linear-gradient(#c5e1a5,#aed581); animation: float1 15s infinite ease-in 3s; }

        .b6 { left: 88%; background: linear-gradient(#fff9c4,#fff176); animation: float2 10s infinite ease-in 1.5s; }

        @keyframes float1 { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-100vh) rotate(20deg); } }

        @keyframes float2 { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-120vh) rotate(-20deg); } }

 

        .hero {

          padding: 56px 20px 20px;

          text-align: center;

          position: relative;

          z-index: 3;

        }

        .title {

          font-family: "Pacifico", cursive;

          font-size: 2.6rem;

          margin: 0;

          color: #3e8a3e;

          text-shadow: 0 2px 8px rgba(0,0,0,0.06);

        }

        .subtitle {

          margin: 8px 0 20px;

          color: #4b6f4b;

          opacity: 0.95;

        }

 

        /* Avatar */

        .avatar { position: relative; width: 190px; height: 190px; margin: 18px auto 6px; }

        .avatar-ring {

          position: absolute; inset: 0; border-radius: 50%;

          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.3));

          box-shadow: 0 0 40px rgba(255, 243, 179, 0.6);

          transform: rotate(-6deg);

        }

        .avatar-inner {

          position: absolute; inset: 12px;

          border-radius: 50%;

          background: rgba(255,255,255,0.95);

          display: flex; align-items: center; justify-content: center;

          font-style: italic; color: #3a7f3a; padding: 10px; text-align: center;

          box-shadow: inset 0 6px 18px rgba(0,0,0,0.03);

          transform: translateY(0);

          transition: transform 0.4s ease;

        }

        .avatar-inner:hover { transform: translateY(-6px); }

        .avatar-glow {

          position: absolute; inset: -6px; border-radius: 50%;

          background: radial-gradient(circle, rgba(255,250,200,0.7), rgba(255,250,200,0));

          filter: blur(12px); pointer-events: none;

        }

 

        .content { padding: 18px 16px 80px; z-index: 3; position: relative; }

 

        .card {

          max-width: 980px;

          margin: 18px auto;

          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));

          border-radius: 14px;

          padding: 18px;

          box-shadow: 0 6px 24px rgba(0,0,0,0.06);

        }

 

        .info-list { text-align: center; line-height: 1.8; color: #2f5c2f; }

 

        /* Gallery grid */

        .gallery .grid {

          display: grid;

          grid-template-columns: repeat(auto-fit, minmax(150px,1fr));

          gap: 12px;

          margin-top: 12px;

        }

        .grid-item {

          height: 120px;

          border-radius: 10px;

          overflow: hidden;

          background: linear-gradient(180deg, #f7fff7, #fbfff2);

          display: flex;

          align-items: center;

          justify-content: center;

          position: relative;

          box-shadow: 0 6px 16px rgba(0,0,0,0.04);

          transform-origin: center;

          animation: itemIn 0.6s ease both;

        }

        .grid-item img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .placeholder {

          width: 100%; height: 100%; display:flex; align-items:center; justify-content:center;

          color: #4b6f4b; font-size: 0.95rem; text-align:center; padding: 8px;

        }

        .placeholder-text { line-height:1.1; }

 

        @keyframes itemIn {

          from { opacity: 0; transform: scale(0.98) translateY(6px); }

          to { opacity: 1; transform: scale(1) translateY(0); }

        }

 

        .hint { margin-top: 10px; font-size: 0.9rem; color: #6b856b; text-align:center; }

 

        /* Wishes */

        .wish-form input, .wish-form textarea {

          width: 100%;

          padding: 10px;

          border-radius: 10px;

          border: 1px solid #cfe9c8;

          font-size: 0.98rem;

        }

        .btn-send {

          background: linear-gradient(90deg, #81c784, #ffeb3b);

          border: none;

          padding: 10px 14px;

          margin-top: 6px;

          border-radius: 10px;

          font-weight: 600;

          cursor: pointer;

        }

        .messages { margin-top: 14px; }

        .message { background: #f8fff1; border-left: 5px solid #8bc34a; padding: 10px; border-radius: 8px; margin-bottom: 8px; }

 

        .muted { color: #6b856b; text-align: center; }

 

        .thanks { text-align: center; color: #4b6f4b; }

 

        /* music btn */

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

 

        /* Responsive tweaks */

        @media (max-width: 600px) {

          .title { font-size: 2.1rem; }

          .avatar { width: 150px; height: 150px; }

        }

      `}</style>

    </div>

  );

}
