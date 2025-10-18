import { useEffect, useRef, useState } from "react";

export default function Home() {
  // --- slideshow images (10 placeholders) ---
  // Replace these URLs later with real image links (keep array length 10)
  const [images] = useState([
    "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519052533-3b3b2b3f0a8a?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-0c8f2a5b4f8b?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526676035471-8a9a4bde9e9c?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530731141654-5993c3016c77?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509339022329-1e0f3f7f9d3f?w=1200&q=80&auto=format&fit=crop"
  ]);

  // slideshow state
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);

  // music
  const [musicOn, setMusicOn] = useState(true);

  // wishes/messages
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]); // persisted only in-memory

  // floating messages (for animation)
  const [floating, setFloating] = useState([]); // {id, text}

  // countdown target
  const targetDate = new Date("2024-11-02T11:30:00"); // local assumed

  // intro animation flag
  const [introDone, setIntroDone] = useState(false);

  // start slideshow interval
  useEffect(() => {
    if (isPlaying) {
      slideInterval.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 4000); // 4s per slide
    }
    return () => clearInterval(slideInterval.current);
  }, [isPlaying, images.length]);

  // autoplay music when page loads (try/catch for autoplay policies)
  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (!audio) return;
    audio.volume = 0.45;
    if (musicOn) {
      audio.play().catch(() => {
        // some browsers block autoplay; user can click music button
      });
    } else {
      audio.pause();
    }
  }, [musicOn]);

  // countdown state
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) return null;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s };
  }

  // handle submit: show floating animation + add to list
  function submitWish(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const id = Date.now();
    setWishes((prev) => [{ id, name: name.trim(), message: message.trim() }, ...prev]);
    // floating text (will animate and auto-remove)
    setFloating((f) => [{ id, text: `${name.trim()}: ${message.trim()}` }, ...f]);
    // remove floating after 4s
    setTimeout(() => {
      setFloating((f) => f.filter((x) => x.id !== id));
    }, 4000);
    setName("");
    setMessage("");
  }

  // slide controls
  function prevSlide() {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setIsPlaying(false);
  }
  function nextSlide() {
    setIndex((i) => (i + 1) % images.length);
    setIsPlaying(false);
  }
  function togglePlay() {
    setIsPlaying((p) => !p);
  }

  // intro complete after animation (we show content after)
  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 900); // matches CSS
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      {/* audio element */}
      <audio
        id="bgMusic"
        loop
        src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_45b8e29c10.mp3?filename=happy-birthday-piano-14175.mp3"
      />

      {/* Intro overlay (open-card effect) */}
      <div className={`intro ${introDone ? "intro-done" : ""}`}>
        <div className="card-open">
          <h1>Thiệp thôi nôi Bé Minh Triết (Mỡ)</h1>
          <p>Chạm để vào thiệp</p>
        </div>
        {!introDone && (
          <button
            className="open-btn"
            onClick={() => {
              setIntroDone(true);
            }}
            aria-label="Mở thiệp"
          >
            Mở
          </button>
        )}
      </div>

      {/* decorative falling petals/leaves (background) */}
      <div className="falling" aria-hidden>
        {/* create many petals via css pseudo or elements */}
        {[...Array(26)].map((_, i) => (
          <div key={i} className={`petal petal-${(i % 6) + 1}`} />
        ))}
      </div>

      {/* floating messages animation layer */}
      <div className="floating-layer" aria-hidden>
        {floating.map((f, i) => (
          <div key={f.id} className="floating">
            {f.text}
          </div>
        ))}
      </div>

      {/* music control */}
      <button
        className="music-btn"
        onClick={() => {
          setMusicOn((m) => !m);
        }}
        aria-label="Bật/Tắt nhạc"
      >
        {musicOn ? "🎵" : "🔇"}
      </button>

      <main className={`container ${introDone ? "visible" : "hidden"}`}>
        <header className="hero">
          <div className="hero-left">
            <h2 className="small">Thiệp Mời Thôi Nôi</h2>
            <h1 className="baby-name">Bé Minh Triết <span className="nick">(Mỡ)</span></h1>

            <div className="countdown">
              {timeLeft ? (
                <div className="time">
                  <div><strong>{timeLeft.d}</strong><span>ngày</span></div>
                  <div><strong>{timeLeft.h}</strong><span>giờ</span></div>
                  <div><strong>{timeLeft.m}</strong><span>p</span></div>
                  <div><strong>{timeLeft.s}</strong><span>s</span></div>
                </div>
              ) : (
                <div className="time-now">Hôm nay là ngày của bé Mỡ! 🎉</div>
              )}
            </div>
          </div>

          {/* avatar + glow */}
          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-ring" />
              <div className="avatar">Ảnh bé Mỡ<br/>đang cập nhật ✨</div>
              <div className="avatar-glow" />
            </div>
          </div>
        </header>

        {/* slideshow */}
        <section className="slideshow card">
          <div className="slide-frame">
            <img src={images[index]} alt={`bé mỡ ${index + 1}`} className="slide-img" />
            <div className="slide-caption">Ảnh {index + 1} / {images.length}</div>
          </div>
          <div className="slide-controls">
            <button onClick={prevSlide} aria-label="Trước">⟨</button>
            <button onClick={togglePlay} aria-label="Play/Pause">{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={nextSlide} aria-label="Tiếp">⟩</button>
          </div>
        </section>

        {/* info */}
        <section className="info card">
          <h3>🍼 Thông tin</h3>
          <p><strong>Ngày:</strong> 02/11/2024 — <strong>11:30</strong></p>
          <p><strong>Địa điểm:</strong> Khu Chung cư đường Tân An 4</p>
          <p className="small-note">Nhờ mời giùm lun nha 💚</p>
        </section>

        {/* gallery grid (10 placeholders) */}
        <section className="gallery card">
          <h3>📸 Album bé Mỡ</h3>
          <div className="grid">
            {images.map((src, i) => (
              <div className="grid-item" key={i}>
                {src ? (
                  <img src={src} alt={`bé mỡ ${i + 1}`} />
                ) : (
                  <div className="placeholder">Ảnh {i + 1} <br />đang cập nhật ✨</div>
                )}
              </div>
            ))}
          </div>
          <p className="hint">Muốn thay ảnh thật? edit `images` array trong <code>pages/index.jsx</code></p>
        </section>

        {/* wishes */}
        <section className="wishes card">
          <h3>💌 Gửi lời chúc</h3>
          <form onSubmit={submitWish} className="wish-form">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Lời chúc tới bé Mỡ..."
              rows={3}
              required
            />
            <div className="form-row">
              <button type="submit" className="send">Gửi lời chúc 💚</button>
            </div>
          </form>

          <div className="recent">
            {wishes.length === 0 ? (
              <p className="muted">Chưa có lời chúc nào — bạn là người đầu tiên nhé!</p>
            ) : (
              wishes.map((w) => (
                <div key={w.id} className="wish-item">
                  <strong>{w.name}</strong>
                  <div className="wish-text">{w.message}</div>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="card footer">
          <p>Gia đình cảm ơn mọi người đã quan tâm & gửi lời chúc tới bé Mỡ 💕</p>
        </footer>
      </main>

      <style jsx>{`
        :root {
          --green-700: #2e5339;
          --green-500: #81c784;
          --yellow-300: #fff59d;
          --bg-1: #e9f8e7;
          --bg-2: #fff8e1;
        }
        .page {
          background: linear-gradient(180deg, var(--bg-1), var(--bg-2));
          min-height: 100vh;
          font-family: "Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: var(--green-700);
        }

        /* Intro overlay */
        .intro {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.98), rgba(255,255,255,0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .intro-done { opacity: 0; visibility: hidden; transform: scale(1.06); pointer-events: none; }
        .card-open {
          text-align: center;
          background: linear-gradient(180deg, rgba(255,255,255,1), rgba(255,250,230,1));
          padding: 28px;
          border-radius: 14px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
          transform-origin: center;
          animation: openCard 0.9s ease forwards;
        }
        .card-open h1 { font-family: "Pacifico", cursive; color: #3e8a3e; margin:0; font-size:1.6rem; }
        .card-open p { margin-top:8px; color:#5a6f5a; }
        .open-btn {
          margin-top: 12px;
          border: none;
          background: linear-gradient(90deg, #81c784, #ffeb3b);
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }
        @keyframes openCard {
          0% { transform: scale(.7) rotate(-6deg); opacity: 0; }
          60% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        /* falling petals/leaves */
        .falling { position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
        .petal {
          position: absolute;
          top: -10%;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          transform: translateY(-20vh) rotate(0deg);
          opacity: 0.95;
        }
        /* different petal styles */
        .petal-1 { background: radial-gradient(circle, #fff9c4, #fff176); left: 5%; animation: fall 8s linear infinite 0s; }
        .petal-2 { background: radial-gradient(circle, #c5e1a5, #aed581); left: 18%; animation: fall 9s linear infinite 1s; }
        .petal-3 { background: radial-gradient(circle, #fff8e1, #ffe082); left: 30%; animation: fall 10s linear infinite 2s; }
        .petal-4 { background: radial-gradient(circle, #e8f5e9, #a5d6a7); left: 45%; animation: fall 11s linear infinite 0.3s; }
        .petal-5 { background: radial-gradient(circle, #fffde7, #fff9c4); left: 62%; animation: fall 12s linear infinite 1.6s; }
        .petal-6 { background: radial-gradient(circle, #f1f8e9, #c8e6c9); left: 78%; animation: fall 9s linear infinite 0.6s; }

        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        /* floating messages */
        .floating-layer { position: fixed; inset: 0; pointer-events: none; z-index: 20; display:flex; align-items:flex-start; justify-content:center; }
        .floating {
          margin-top: 18vh;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
          padding: 10px 14px;
          border-radius: 14px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
          animation: floatUp 3.6s ease forwards;
          font-weight: 600;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          70% { transform: translateY(-120px) scale(1.02); opacity: 0.9; }
          100% { transform: translateY(-240px) scale(0.98); opacity: 0; }
        }

        /* music button */
        .music-btn {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 9999;
          background: linear-gradient(180deg,#81c784,#5aa25a);
          border: none;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
          color: white;
          font-size: 1.15rem;
          cursor: pointer;
        }

        /* container layout */
        .container.hidden { opacity: 0; pointer-events: none; transform: scale(.98); }
        .container.visible { opacity: 1; transform: none; transition: opacity .6s, transform .6s; z-index: 3; position: relative; }

        .hero {
          display:flex;
          gap: 18px;
          align-items:center;
          justify-content: space-between;
          padding: 28px 18px 8px;
          max-width: 980px;
          margin: 10px auto;
          z-index: 3;
        }
        .hero-left { flex: 1; min-width: 220px; }
        .small { color: #6a8a6a; margin:0; font-size: .95rem; }
        .baby-name { margin: 6px 0 8px; font-size: 1.8rem; color: #277a30; }
        .nick { font-size: .9rem; color: #4a7b4a; font-weight:700; }

        .countdown .time { display:flex; gap:12px; margin-top:8px; }
        .time div { background: #fff; padding:8px 10px; border-radius:8px; box-shadow: 0 6px 12px rgba(0,0,0,0.06); min-width:62px; }
        .time strong { display:block; font-size:1.1rem; color:#2e5339; }
        .time span { font-size:.75rem; color:#5d7a5d; }

        .hero-right { width:220px; display:flex; align-items:center; justify-content:center; }
        .avatar-wrap { position:relative; width:180px; height:180px; }
        .avatar-ring { position:absolute; inset:0; border-radius:50%; background: radial-gradient(circle at 30% 30%, rgba(255,251,220,0.9), rgba(255,251,220,0.5)); box-shadow: 0 12px 40px rgba(255,243,179,0.35); transform: rotate(-6deg); }
        .avatar { position:absolute; inset:12px; border-radius:50%; background: rgba(255,255,255,0.95); display:flex; align-items:center; justify-content:center; text-align:center; padding:10px; color:#3a7f3a; font-style:italic; box-shadow: inset 0 8px 20px rgba(0,0,0,0.03); }
        .avatar-glow { position:absolute; inset:-6px; border-radius:50%; background: radial-gradient(circle, rgba(255,250,200,0.65), rgba(255,250,200,0)); filter: blur(10px); }

        /* card style */
        .card { max-width: 980px; margin: 14px auto; padding: 16px; border-radius: 14px; background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9)); box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .slideshow .slide-frame { position:relative; height: 320px; border-radius:12px; overflow:hidden; }
        .slide-img { width:100%; height:100%; object-fit:cover; display:block; transform-origin:center; transition: transform 0.9s ease; }
        .slide-caption { position:absolute; left:12px; bottom:12px; background:rgba(255,255,255,0.85); padding:6px 10px; border-radius:8px; box-shadow: 0 6px 12px rgba(0,0,0,0.05); font-weight:600; }
        .slide-controls { display:flex; gap:8px; justify-content:center; margin-top:10px; }
        .slide-controls button { border:none; background:linear-gradient(90deg,#81c784,#ffeb3b); padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700; }

        .info p { margin:6px 0; color:#355f38; }
        .small-note { margin-top:10px; color:#6a8a6a; font-style:italic; }

        /* gallery grid */
        .gallery .grid { display:grid; grid-template-columns: repeat(5, 1fr); gap:10px; margin-top:10px; }
        @media (max-width:900px) { .gallery .grid { grid-template-columns: repeat(2,1fr); } .hero { flex-direction:column; align-items:center; } .hero-right { order:-1; } }
        .grid-item { height:110px; border-radius:10px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#fbfff2,#f7fff7); box-shadow: 0 8px 20px rgba(0,0,0,0.04); }
        .grid-item img { width:100%; height:100%; object-fit:cover; display:block; }
        .placeholder { text-align:center; color:#4b6f4b; padding:8px; }

        .hint { margin-top:8px; color:#6b856b; text-align:center; font-size:.92rem; }

        /* wishes */
        .wish-form { display:flex; flex-direction:column; gap:8px; margin-top:10px; }
        .wish-form input, .wish-form textarea { padding:10px; border-radius:10px; border:1px solid #dfeeda; font-size:1rem; }
        .form-row { display:flex; gap:10px; justify-content:flex-end; }
        .send { background: linear-gradient(90deg,#81c784,#ffeb3b); border:none; padding:10px 14px; border-radius:10px; cursor:pointer; font-weight:700; }

        .recent .wish-item { margin-top:10px; padding:10px; background: #f7fff7; border-left:4px solid #8bc34a; border-radius:8px; }

        .footer { text-align:center; margin: 22px auto; }

      `}</style>
    </div>
  );
}
