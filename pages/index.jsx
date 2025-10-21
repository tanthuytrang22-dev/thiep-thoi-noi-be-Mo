{/* Countdown */}
<div className="countdown">
  <h3>⏳ Còn lại:</h3>
  <div className="count-box">
    <div className="time">
      <span>{timeLeft.days}</span>
      <small>Ngày</small>
    </div>
    <div className="time">
      <span>{timeLeft.hours}</span>
      <small>Giờ</small>
    </div>
    <div className="time">
      <span>{timeLeft.mins}</span>
      <small>Phút</small>
    </div>
    <div className="time">
      <span>{timeLeft.secs}</span>
      <small>Giây</small>
    </div>
  </div>
</div>
