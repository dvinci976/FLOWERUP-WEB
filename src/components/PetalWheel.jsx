import { useI18n } from "../i18n/I18nProvider";
import { useRef } from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import Minus from "lucide-react/dist/esm/icons/minus.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import { FlowerMark, HappyMarks } from "./FlowerMark";
export function PetalWheel({ options, value, onChange, label, optionLabel = (option) => option }) {
  const { t } = useI18n();
  const index = Math.max(0, options.indexOf(value));
  const start = useRef(null);
  const move = (delta) =>
    onChange(options[(index + delta + options.length) % options.length]);
  return (
    <div className="wheel-wrap">
      <div
        className={`wheel petal-wheel clear-petals ${options.length === 3 ? "frequency-petals" : "quantity-petals"}`}
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
        <HappyMarks className="wheel-marks" />
        <div className="petal-center">
          <FlowerMark />
          <span className="sr-only" aria-live="polite">
            {optionLabel(value)}
          </span>
        </div>
        {options.map((option, i) => {
          const [x, y, rotation] = options.length === 3
            ? [[50, 23, 45], [25, 68, -75], [75, 68, -195]][i]
            : [[26, 26, 0], [74, 26, 90], [74, 74, 180], [26, 74, 270]][i];
          return (
            <button
              key={option}
              className={`petal-option petal-${options.length === 3 ? [0, 3, 1][i] : i} ${value === option ? "selected" : ""}`}
              style={{left:`${x}%`,top:`${y}%`, '--petal-turn':`${rotation}deg`, '--label-turn':`${-rotation}deg`}}
              aria-pressed={value === option}
              onClick={() => onChange(option)}
            >
              <span>
                {optionLabel(option)}
              </span>
              {value === option && <i className="petal-pick" aria-hidden="true"><FlowerMark color="#fffaf0"/><Check size={14}/></i>}
            </button>
          );
        })}
      </div>
      <div className="wheel-controls">
        <button aria-label={t('wheel.previous')} onClick={() => move(-1)}>
          <Minus size={18} />
        </button>
        <span>{t('wheel.hint')}</span>
        <button aria-label={t('wheel.next')} onClick={() => move(1)}>
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
