export function FlowerMark({ className = "", color = "#ff4b8d" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="50"
          cy="29"
          rx="13"
          ry="25"
          transform={`rotate(${a} 50 50)`}
          fill={color}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="#ffd03c" />
    </svg>
  );
}
export function HappyMarks({ className = "" }) {
  return <svg className={`happy-marks garden-bee ${className}`} viewBox="0 0 100 90" aria-hidden="true">
    <ellipse cx="40" cy="29" rx="14" ry="20" transform="rotate(-30 40 29)" fill="#d6efef" stroke="#357e84" strokeWidth="2"/>
    <ellipse cx="60" cy="29" rx="14" ry="20" transform="rotate(30 60 29)" fill="#d6efef" stroke="#357e84" strokeWidth="2"/>
    <ellipse cx="48" cy="55" rx="30" ry="21" fill="#ffd439" stroke="#073347" strokeWidth="2"/>
    <path d="M36 37Q28 54 36 73M50 35Q43 55 50 75" fill="none" stroke="#073347" strokeWidth="7"/>
    <circle cx="73" cy="51" r="14" fill="#073347"/>
    <circle cx="78" cy="48" r="3" fill="#fffaf0"/>
    <path d="M75 38L82 27M19 55L10 53" stroke="#073347" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}
