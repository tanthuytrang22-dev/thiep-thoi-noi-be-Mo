import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    const newWish = { name, message, id: Date.now() };
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
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        fontFamily: "'Quicksand', sans-serif",
        background: "linear-gradient(to bottom, #e0f8dc, #fff8e1)",
        color: "#2e5339",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", padding: "60px 20px 30px", position: "relative" }}>
        {[1, 2, 3, 4, 5].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "-150px",
              left: `${10 + i * 18}%`,
              width: "60px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: ["#ffeb3b", "#81c784", "#aed581", "#fff176", "#c5e1a5"][i],
              opacity: 0.8,
              animation: `floatUp ${10 + i}s infinite ease-in ${i * 2}s`,
            }}
          />
        ))}

        <h1
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "2.8em",
            color: "#4caf50",
            animation: "fadeInDown 2s ease-in-out",
          }}
        >
          Thiệp Mời Thôi Nôi Bé Mỡ 🎂
        </h1>
        <p style={{ fontSize: "1.2em", color: "#666", animation: "fadeInUp 2.5s ease-in-out" }}>
          Trân trọng kính mời mọi người đến chung vui cùng bé Minh Triết 💚
        </p>

        {/* Khung ảnh */}
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            margin: "30px auto 10px",
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 20px rgba(255, 255, 150, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontStyle: "italic",
            color: "#3a7f3a",
            fontSize: "0.95em",
          }}
        >
          Ảnh bé Mỡ đang cập nhật ✨
        </div>
      </header>

      {/* Thông tin */}
      <section
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "rgba(255,255,255,0.8)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#3a7f3a" }}>🍼 Thông Tin Bữa Tiệc</h2>
        <div style={{ textAlign: "center", lineHeight: "1.8", fontSize: "1.1em" }}>
          <p>
            <strong>Bé:</strong> Minh Triết (Mỡ)
          </p>
          <p>
            <strong>Thời gian:</strong> 11h30 - Ngày 2/11/2024
          </p>
          <p>
            <strong>Địa điểm:</strong> Khu Chung Cư Đường Tân An 4
          </p>
        </div>
      </section>

      {/* Form gửi lời chúc */}
      <section
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "rgba(255,255,255,0.8)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#3a7f3a" }}>💌 Gửi Lời Chúc Đến Bé Mỡ</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}
        >
          <input
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #a5d6a7",
              fontSize: "1em",
            }}
          />
          <textarea
            placeholder="Lời chúc dễ thương..."
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #a5d6a7",
              fontSize: "1em",
              resize: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #81c784, #ffeb3b)",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "1.1em",
              fontWeight: "bold",
              color: "#2e5339",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Gửi lời chúc 💚
          </button>
        </form>

        {/* Hiển thị lời chúc */}
        <div style={{ marginTop: "20px" }}>
          {wishes.map((w) => (
            <div
              key={w.id}
              style={{
                background: "#f1f8e9",
                borderLeft: "5px solid #81c784",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              <strong>{w.name}</strong>: {w.message}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#666",
          fontStyle: "italic",
          backgroundColor: "#f9fbe7",
        }}
      >
        Cảm ơn vì đã gửi lời chúc đến bé Mỡ 💕
        <br />— Gia đình bé Minh Triết —
      </footer>

      {/* Nhạc nền */}
      <audio
        id="bgMusic"
        loop
        autoPlay
        src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_45b8e29c10.mp3?filename=happy-birthday-piano-14175.mp3"
      />

      {/* Nút nhạc */}
      <div
        id="music-control"
        onClick={toggleMusic}
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          background: "#81c784",
          color: "white",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          fontSize: "1.5em",
        }}
      >
        {isPlaying ? "🎵" : "🔇"}
      </div>

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-900px) rotate(15deg);
            opacity: 0;
          }
        }
        @keyframes fadeInDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
