export default function Home() {
  return (
    <main
      style={{
        fontFamily: "sans-serif",
        background: "linear-gradient(to bottom right, #a8e6cf, #dcedc1)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#2e7d32",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Thiệp Mời Thôi Nôi 🌿
      </h1>
      <h2 style={{ fontSize: "2rem", color: "#388e3c" }}>
        Bé Minh Triết (Mỡ)
      </h2>

      <p style={{ fontSize: "1.1rem", marginTop: "20px" }}>
        💚 Trân trọng kính mời cả nhà cùng đến chung vui ngày thôi nôi của bé 💚
      </p>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "20px",
          padding: "20px 30px",
          marginTop: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: "400px"
        }}
      >
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          📅 <strong>Ngày:</strong> 02/11/2024
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          ⏰ <strong>Thời gian:</strong> 11h30
        </p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>
          📍 <strong>Địa điểm:</strong> Khu Chung cư đường Tân An 4
        </p>
      </div>

      <p style={{ marginTop: "30px", fontStyle: "italic", color: "#33691e" }}>
        “Nhờ mời giùm lun nha!” 😄
      </p>

      <p style={{ marginTop: "50px", fontSize: "0.9rem", opacity: 0.6 }}>
        — Thiệp mời bé Mỡ 💚 —
      </p>
    </main>
  );
}
