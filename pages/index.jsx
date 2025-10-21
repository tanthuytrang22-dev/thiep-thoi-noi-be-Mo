import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
        }

        p {
          margin: 5px 0;
          font-size: 1.1rem;
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
      `}</style>
    </div>
  );
}
