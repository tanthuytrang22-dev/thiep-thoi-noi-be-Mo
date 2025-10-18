import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Countdown function
    const countdown = () => {
      const targetDate = new Date("2024-11-02T11:30:00").getTime();
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          clearInterval(timer);
          const countdownEl = document.getElementById("countdown");
          if (countdownEl) {
            countdownEl.innerHTML = "🎈 Đã tới ngày thôi nôi bé Mỡ rồi! 💛";
          }
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
      }, 1000);
    };
    countdown();

    // Sparkle background effect
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle-bg";
    document.body.appendChild(sparkle);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-yellow-50 text-center p-6 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-green-700 mb-4 animate-pulse">
        🎉 Thiệp Mời Thôi Nôi Bé Minh Triết (Mỡ) 🎂
      </h1>
      <p className="text-gray-600 mb-4 text-lg">
        Ngày 02/11/2024 - 11h30 <br />
        Tại Khu chung cư đường Tân An 4 💚
      </p>

      {/* Countdown Section */}
      <section className="countdown card bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
        <h2 className="text-2xl font-bold text-green-700 mb-4 animate-pulse">
          ⏳ Đếm ngược đến ngày thôi nôi bé Mỡ 🎈
        </h2>
        <div
          id="countdown"
          className="flex gap-4 justify-center text-yellow-700 font-semibold text-3xl"
        >
          <div className="flex flex-col items-center p-3 bg-gradient-to-b from-green-100 to-yellow-100 rounded-xl shadow-md animate-bounce-slow">
            <span id="days" className="text-4xl font-bold"></span>
            <p className="text-sm text-gray-500">Ngày</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-gradient-to-b from-yellow-100 to-green-100 rounded-xl shadow-md animate-bounce-slower">
            <span id="hours" className="text-4xl font-bold"></span>
            <p className="text-sm text-gray-500">Giờ</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-gradient-to-b from-green-100 to-yellow-100 rounded-xl shadow-md animate-bounce-slow">
            <span id="minutes" className="text-4xl font-bold"></span>
            <p className="text-sm text-gray-500">Phút</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-gradient-to-b from-yellow-100 to-green-100 rounded-xl shadow-md animate-bounce-slower">
            <span id="seconds" className="text-4xl font-bold"></span>
            <p className="text-sm text-gray-500">Giây</p>
          </div>
        </div>
      </section>

      {/* Lời mời */}
      <section className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md p-6 max-w-md text-gray-700 leading-relaxed">
        <p>Ba mẹ bé Mỡ trân trọng kính mời anh/chị cùng gia đình đến dự buổi tiệc thôi nôi của bé 🍼</p>
        <p className="mt-2 font-semibold text-green-700">
          Sự hiện diện của mọi người là niềm vui lớn của gia đình chúng tôi 💛
        </p>
      </section>

      {/* Sparkle animation background */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slower {
          animation: bounce-slower 4s ease-in-out infinite;
        }

        /* Sparkle pastel background */
        .sparkle-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(255, 255, 200, 0.2) 1px, transparent 1px),
            radial-gradient(rgba(200, 255, 200, 0.2) 1px, transparent 1px);
          background-size: 100px 100px;
          animation: sparkleMove 10s linear infinite;
          z-index: -1;
        }
        @keyframes sparkleMove {
          0% { background-position: 0 0, 50px 50px; }
          100% { background-position: 100px 100px, 150px 150px; }
        }
      `}</style>
    </div>
  );
}
