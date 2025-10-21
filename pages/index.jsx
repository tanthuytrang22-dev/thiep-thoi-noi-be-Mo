import { useState, useEffect } from "react";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);

  // Countdown setup
  useEffect(() => {
    const targetDate = new Date("2025-11-02T11:30:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({});
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle wishes
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && message) {
      setWishes([...wishes, { name, message }]);
      setName("");
      setMessage("");
    }
  };

  // Balloons 🎈
  useEffect(() => {
    const createBalloon = () => {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      const pastelColors = [
        "linear-gradient(45deg, #b4f8c8, #a0e7e5)",
        "linear-gradient(45deg, #fbe7c6, #fff5b7)",
        "linear-gradient(45deg, #ffb5e8, #ffcce7)",
      ];
      balloon.style.background = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      balloon.style.left = `${Math.random() * 100}vw`;
      balloon.style.animationDuration = `${6 + Math.random() * 5}s`;
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 10000);
    };
    const interval = setInterval(createBalloon, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-50 min-h-screen text-green-900 font-sans relative overflow-hidden">
      {/* Background Music */}
      <audio autoPlay loop muted={!isPlaying}>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/22/audio_b8b4e4b9d2.mp3" type="audio/mp3" />
      </audio>

      {/* Toggle Music */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 bg-green-200 px-3 py-1 rounded-full shadow-md hover:bg-green-300 transition"
      >
        {isPlaying ? "🔊" : "🔈"}
      </button>

      {/* Hero Section */}
      <div className="text-center py-10 fade-in">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Thiệp mời thôi nôi bé Minh Triết 💚
        </h1>
        <img
          src="https://i.pinimg.com/originals/d7/cc/da/d7ccda7359dc2b60c70258b9a83b80fc.jpg"
          alt="Bé Minh Triết"
          className="mx-auto rounded-2xl shadow-lg w-64 h-64 object-cover border-4 border-green-300"
        />
      </div>

      {/* Event Info */}
      <div className="text-center bg-white mx-4 rounded-2xl shadow-lg p-6 border border-green-200 fade-in">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">📅 Ngày: 02/11/2025</h2>
        <p className="text-lg">🕓 Thời gian: 11h30</p>
        <p className="text-lg">📍 Địa điểm: Khu Chung cư đường Tân An 4</p>
      </div>

      {/* Countdown */}
      <div className="text-center my-8 zoom-in">
        <h3 className="text-xl font-semibold mb-2">⏰ Còn lại:</h3>
        {timeLeft.days !== undefined ? (
          <div className="flex justify-center gap-4 text-2xl font-bold">
            <div>{timeLeft.days}d</div>
            <div>{timeLeft.hours}h</div>
            <div>{timeLeft.minutes}m</div>
            <div>{timeLeft.seconds}s</div>
          </div>
        ) : (
          <p>🎉 Đã đến ngày thôi nôi rồi!</p>
        )}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-2 px-4 my-6 fade-in">
        {[...Array(15)].map((_, i) => (
          <img
            key={i}
            src={`https://placekitten.com/${200 + i}/${200 + i}`}
            alt={`Ảnh ${i + 1}`}
            className="rounded-xl shadow-md object-cover w-full h-40 hover:scale-105 transition-transform"
          />
        ))}
      </div>

      {/* Wish Form */}
      <div className="text-center px-4 py-8 bg-green-100 rounded-2xl mx-4 shadow-inner fade-in">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">💌 Gửi lời chúc đến bé Minh Triết</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-green-300 rounded-lg"
          />
          <textarea
            placeholder="Lời chúc của bạn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-green-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Gửi lời chúc
          </button>
        </form>
      </div>

      {/* Wishes */}
      <div className="px-4 py-8">
        <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">💚 Lời chúc từ mọi người 💚</h3>
        {wishes.length > 0 ? (
          <div className="space-y-3">
            {wishes.map((wish, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-xl shadow border border-green-100 fade-in"
              >
                <p className="font-bold">{wish.name}</p>
                <p>{wish.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Hãy là người đầu tiên gửi lời chúc nhé 💕</p>
        )}
      </div>

      {/* Balloons */}
      <style>{`
        .balloon {
          position: fixed;
          bottom: -100px;
          width: 30px;
          height: 40px;
          border-radius: 50%;
          opacity: 0.8;
          animation: floatUp ease-in infinite;
          z-index: 0;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .fade-in {
          animation: fadeIn 1s ease-in;
        }

        .zoom-in {
          animation: zoomIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
