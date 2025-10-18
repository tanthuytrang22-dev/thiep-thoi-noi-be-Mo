import { useEffect, useState } from "react";

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [audio, setAudio] = useState(null);

  // Countdown đến ngày 2/11/2024 11:30
  useEffect(() => {
    const target = new Date("2024-11-02T11:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Hiệu ứng mở thiệp
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Phát nhạc baby piano
  const handlePlayMusic = () => {
    if (!audio) {
      const newAudio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7b2538e5ce.mp3");
      newAudio.loop = true;
      newAudio.play();
      setAudio(newAudio);
    } else {
      audio.paused ? audio.play() : audio.pause();
    }
  };

  // Gửi lời chúc
  const handleSendMessage = () => {
    if (newMessage.trim() && newName.trim()) {
      const msg = { name: newName, text: newMessage, id: Date.now() };
      setMessages([...messages, msg]);
      setNewMessage("");
      setNewName("");
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      }, 5000);
    }
  };

  // Hiệu ứng hoa lá pastel rơi 🍃🌼
  useEffect(() => {
    const createLeaf = () => {
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      leaf.style.left = Math.random() * 100 + "vw";
      leaf.style.animationDuration = 5 + Math.random() * 5 + "s";
      document.body.appendChild(leaf);
      setTimeout(() => leaf.remove(), 10000);
    };
    const interval = setInterval(createLeaf, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E9F8E5 0%, #FFFBEA 100%)",
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <button
        onClick={handlePlayMusic}
        className="absolute top-4 right-4 bg-white/70 px-3 py-1 rounded-full text-sm shadow"
      >
        🎵 Nhạc
      </button>

      <div
        className={`transition-all duration-700 ${
          showCard ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center w-11/12 md:w-1/2`}
      >
        <h1 className="text-3xl font-bold text-green-700 mb-2">Thiệp Mời Thôi Nôi</h1>
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Bé Minh Triết (Mỡ)</h2>
        <p className="text-gray-700 mb-2">📅 Ngày 2/11/2024 - 🕦 11h30</p>
        <p className="text-gray-700 mb-4">🏡 Khu Chung cư, Đường Tân An 4</p>

        <div className="text-lg font-medium text-green-800 mb-4">
          <p>Hãy cùng đến chung vui và gửi lời chúc tốt đẹp nhất cho bé Mỡ nhé!</p>
        </div>

        {/* Countdown */}
        <div className="mt-6 text-2xl text-yellow-700 font-bold">
          <p>
            {timeLeft.days ?? 0}d : {timeLeft.hours ?? 0}h :{" "}
            {timeLeft.minutes ?? 0}m : {timeLeft.seconds ?? 0}s
          </p>
          <p className="text-sm text-gray-600 mt-1">Còn lại đến ngày thôi nôi 🎂</p>
        </div>

        {/* Lời chúc */}
        <div className="mt-8">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Tên bạn"
            className="border rounded-full px-3 py-2 text-sm mr-2"
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Lời chúc gửi đến bé Mỡ 💕"
            className="border rounded-full px-3 py-2 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-yellow-400 text-white px-3 py-2 rounded-full text-sm"
          >
            Gửi
          </button>
        </div>
      </div>

      {/* Hiệu ứng lời chúc bay lên */}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="absolute text-yellow-700 font-semibold animate-fly"
          style={{
            left: `${30 + Math.random() * 40}%`,
            bottom: "10%",
            fontSize: "1rem",
          }}
        >
          💌 {msg.name}: {msg.text}
        </div>
      ))}

      {/* CSS hiệu ứng */}
      <style jsx>{`
        .leaf {
          position: fixed;
          top: -10px;
          width: 20px;
          height: 20px;
          background-image: url('https://cdn-icons-png.flaticon.com/512/616/616408.png');
          background-size: cover;
          opacity: 0.7;
          animation: fall linear forwards;
          pointer-events: none;
        }
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes fly {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px);
          }
        }
        .animate-fly {
          animation: fly 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
