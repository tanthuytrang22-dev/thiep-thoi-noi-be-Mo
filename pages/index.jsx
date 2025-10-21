import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Cập nhật countdown (ví dụ tới ngày 25/10/2025)
  useEffect(() => {
    const targetDate = new Date("2025-10-25T18:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
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
    <div className="invitation">
      <h1>🌸 Thiệp Mời Thôi Nôi Bé Mỡ 🌸</h1>
      <p>Trân trọng kính mời mọi người đến dự tiệc thôi nôi bé Mỡ!</p>

      {/* Countdown sinh động */}
      <div className="countdown-container">
        <h2 className="countdown-title">⏰ Đếm ngược tới ngày thôi nôi!</h2>
        <div className="countdown">
          <div><span>{timeLeft.days}</span><small>Ngày</small></div>
          <div><span>{timeLeft.hours}</span><small>Giờ</small></div>
          <div><span>{timeLeft.minutes}</span><small>Phút</small></div>
          <div><span>{timeLeft.seconds}</span><small>Giây</small></div>
        </div>
      </div>

      <img src="https://i.imgur.com/QF5L4qX.png" alt="bé Mỡ" className="baby-img" />

      <div className="event-info">
        <p><strong>📅 Thời gian:</strong> 18h00 - Ngày 25/10/2025</p>
        <p><strong>📍 Địa điểm:</strong> Nhà bé Mỡ - 123 Đường Hoa Sen, TP Huế</p>
      </div>

      <h3>💌 Gửi lời chúc đến bé Mỡ 💌</h3>
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

      <style jsx>{`
        .invitation {
          text-align: center;
          background: linear-gradient(180deg, #fff5f8, #ffeaf2);
          color: #444;
          min-height: 100vh;
          padding: 30px 20px;
          font-family: "Poppins", sans-serif;
        }

        h1 {
          color: #e75480;
          font-size: 2.2rem;
          margin-bottom: 10px;
          animation: fadeIn 1.5s ease-in-out;
        }

        p {
          margin: 5px 0;
          font-size: 1.1rem;
        }

        .countdown-container {
          margin: 25px 0;
          animation: pulse 3s infinite;
        }

        .countdown-title {
          font-size: 1.3rem;
          color: #e75480;
          margin-bottom: 10px;
          animation: colorShift 5s infinite linear;
        }

        .countdown {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .countdown div {
          background: white;
          padding: 10px 14px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(255, 182, 193, 0.4);
          transition: transform 0.3s ease;
        }

        .countdown div:hover {
          transform: scale(1.1);
        }

        .countdown span {
          display: block;
          font-size: 1.6rem;
          font-weight: bold;
          color: #ff3d7f;
          text-shadow: 0 0 8px rgba(255, 0, 102, 0.3);
        }

        .countdown small {
          font-size: 0.8rem;
          color: #777;
        }

        .baby-img {
          width: 200px;
          border-radius: 50%;
          margin: 20px 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .event-info {
          background: white;
          display: inline-block;
          padding: 15px 20px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(255, 192, 203, 0.4);
          margin: 20px 0;
        }

        form {
          margin-top: 15px;
        }

        input, textarea {
          width: 90%;
          padding: 8px;
          margin: 5px 0;
          border-radius: 8px;
          border: 1px solid #ffc0cb;
          outline: none;
        }

        button {
          background: #ff80ab;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          margin-top: 5px;
          transition: background 0.3s;
        }

        button:hover {
          background: #ff4d88;
        }

        .wish-list {
          margin-top: 20px;
        }

        .wish-item {
          background: #fff;
          border-radius: 10px;
          padding: 10px;
          margin: 8px auto;
          width: 90%;
          box-shadow: 0 2px 6px rgba(255, 182, 193, 0.3);
          text-align: left;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes colorShift {
          0% { color: #e75480; }
          50% { color: #ff4d88; }
          100% { color: #e75480; }
        }
      `}</style>
    </div>
  );
}
