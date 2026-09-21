import { useRef } from "react";
import { Minus, Plus } from "lucide-react";
export function Wheel({ options, value, onChange, label }) {
  const index = Math.max(0, options.indexOf(value));
  const start = useRef(null);
  const move = (delta) =>
    onChange(options[(index + delta + options.length) % options.length]);
  return (
    <div className="wheel-wrap">
      <div
        className="wheel"
        role="group"
        aria-label={label}
        onKeyDown={(e) => {
          if (
            ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)
          ) {
            e.preventDefault();
            move(["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1);
          }
        }}
        onPointerDown={(e) => {
          start.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          if (start.current) {
            const dx = e.clientX - start.current.x,
              dy = e.clientY - start.current.y;
            if (Math.max(Math.abs(dx), Math.abs(dy)) > 35)
              move((Math.abs(dx) > Math.abs(dy) ? dx : dy) > 0 ? 1 : -1);
            start.current = null;
          }
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        <div className="wheel-core">
          <span>YOUR HAPPY RHYTHM</span>
          <strong aria-live="polite">{value}</strong>
          <span>✿</span>
        </div>
        {options.map((option, i) => {
          const angle = ((-90 + (i * 360) / options.length) * Math.PI) / 180;
          return (
            <button
              key={option}
              className={`wheel-option ${value === option ? "selected" : ""}`}
              style={{
                left: `${50 + 43 * Math.cos(angle)}%`,
                top: `${50 + 43 * Math.sin(angle)}%`,
              }}
              aria-pressed={value === option}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="wheel-controls">
        <button aria-label="Previous option" onClick={() => move(-1)}>
          <Minus size={18} />
        </button>
        <span>Tap a choice. Find your rhythm.</span>
        <button aria-label="Next option" onClick={() => move(1)}>
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
