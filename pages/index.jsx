import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2024-11-02T11:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    setWishes([...wishes, { name, message }]);
    setName("");
    setMessage("");
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>Thiệp Mời Thôi Nôi Bé Mỡ 🎉</h1>
        <p>Trân trọng kính mời mọi người đến dự tiệc thôi nôi của bé!</p>

        {/* Countdown section */}
        <div className="countdown">
          <p>⏳ Còn lại:</p>
          <div className="countdown-box">
            <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> :{" "}
            <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span>
          </div>
        </div>

        <img
          src="https://i.imgur.com/QF5L4qX.png"
          alt="Bé Mỡ"
          className="baby-img"
        />
      </header>

      <section className="event-info">
        <h2>🎈 Thông tin buổi tiệc</h2>
        <p>
          <strong>📅 Thời gian:</strong> 11h30 - Ngày 02/11/2024
        </p>
        <p>
          <strong>📍 Địa điểm:</strong> Tư gia nhà bé Mỡ - 123 Đường Hoa Sen,
          TP Huế
        </p>
      </section>

      <section className="wish-section">
        <h2>💌 Gửi lời chúc đến bé Mỡ</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Lời chúc..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Gửi lời chúc</button>
        </form>

        <div className="wish-list">
          {wishes.map((wish, index) => (
            <div key={index} className="wish-item">
              <strong>{wish.name}:</strong> {wish.message}
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>💖 Hẹn gặp lại mọi người trong ngày vui của bé Mỡ 💖</p>
      </footer>

      <style jsx>{`
        .container {
          text-align: center;
          background: linear-gradient(180deg, #fff8f5, #fef6e4);
          color: #333;
          min-height: 100vh;
          padding: 30px 20px;
          font-family: "Poppins", sans-serif;
        }

        .hero {
          margin-bottom: 20px;
        }

        h1 {
          color: #f25c54;
          font-size: 2.4rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px #fff;
          animation: glow 3s infinite alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 5px #f25c54, 0 0 10px #ffcc80;
          }
          to {
            text-shadow: 0 0 15px #ff8a65, 0 0 30px #fdd835;
          }
        }

        .countdown {
          margin: 10px 0 20px;
          font-size: 1.2rem;
          color: #444;
        }

        .countdown-box {
          display: inline-block;
          padding: 10px 20px;
          background: linear-gradient(90deg, #fff3cd, #ffeeba);
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(255, 221, 87, 0.6);
          font-weight: bold;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .baby-img {
          width: 200px;
          border-radius: 50%;
          margin: 20px 0;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .event-info {
          background: #fffbea;
          display: inline-block;
          padding: 15px 25px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(255, 224, 138, 0.5);
          margin: 20px 0;
        }

        .wish-section {
          margin-top: 25px;
        }

        input,
        textarea {
          width: 90%;
          padding: 8px;
          margin: 5px 0;
          border-radius: 8px;
          border: 1px solid #ffd54f;
          outline: none;
        }

        button {
          background: #f9a825;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          margin-top: 5px;
          transition: background 0.3s;
        }

        button:hover {
          background: #f57f17;
        }

        .wish-item {
          background: #fff;
          border-radius: 10px;
          padding: 10px;
          margin: 8px auto;
          width: 90%;
          box-shadow: 0 2px 6px rgba(255, 204, 128, 0.4);
          text-align: left;
        }

        footer {
          margin-top: 30px;
          color: #777;
        }
      `}</style>
    </div>
  );
}
