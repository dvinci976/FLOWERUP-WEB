import { palettes, vibes } from "../data";
function Flower({ x, y, size = 35, color = "#ec613f", rotation = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy={-size * 0.57}
          rx={size * 0.29}
          ry={size * 0.58}
          fill={color}
          transform={`rotate(${i * 45})`}
        />
      ))}
      <circle r={size * 0.3} fill="#f2cf4b" />
      <circle r={size * 0.12} fill="#756032" />
    </g>
  );
}
export function Bouquet({ variant = 0, hero = false }) {
  const p = palettes[variant];
  return (
    <svg
      className={`bouquet ${hero ? "bouquet-hero" : ""}`}
      viewBox="0 0 480 520"
      role="img"
      aria-label={`${vibes[variant]} flower illustration`}
    >
      <g fill="none" stroke="#47733e" strokeWidth="5" strokeLinecap="round">
        <path d="M240 430 Q215 285 136 142M240 430 Q270 240 342 106M238 430 Q200 260 244 78M243 430 Q260 285 373 220M238 430 Q175 315 101 246M240 430 L285 181" />
      </g>
      <g fill="#79935a">
        <ellipse
          cx="182"
          cy="267"
          rx="17"
          ry="51"
          transform="rotate(-42 182 267)"
        />
        <ellipse
          cx="280"
          cy="284"
          rx="16"
          ry="49"
          transform="rotate(35 280 284)"
        />
        <ellipse
          cx="317"
          cy="208"
          rx="14"
          ry="39"
          transform="rotate(47 317 208)"
        />
        <ellipse
          cx="211"
          cy="186"
          rx="13"
          ry="36"
          transform="rotate(-28 211 186)"
        />
        <ellipse
          cx="150"
          cy="332"
          rx="12"
          ry="42"
          transform="rotate(-52 150 332)"
        />
      </g>
      <Flower x={136} y={145} size={47} color={p[0]} />
      <Flower x={244} y={89} size={42} color={p[1]} rotation={15} />
      <Flower x={342} y={115} size={48} color={p[0]} />
      <Flower x={285} y={204} size={51} color={p[1]} />
      <Flower x={106} y={252} size={39} color={p[1]} />
      <Flower x={370} y={239} size={36} color={p[2]} />
      <Flower x={199} y={223} size={33} color={p[2]} />
      <path
        d="M180 340 Q242 359 304 340 L284 475 Q240 499 197 475 Z"
        fill={hero ? "#729ac1" : "#d7b9aa"}
      />
      <path
        d="M193 352 L207 470 M218 357 L223 480 M245 359 L245 483 M272 354 L267 478 M294 350 L281 468"
        fill="none"
        stroke={hero ? "#567da3" : "#b99d90"}
        strokeWidth="3"
      />
      <ellipse
        cx="242"
        cy="340"
        rx="62"
        ry="11"
        fill={hero ? "#527ca5" : "#ae9587"}
      />
      <path
        d="M235 346 L223 305 M247 347 L267 300"
        stroke="#47733e"
        strokeWidth="5"
      />
    </svg>
  );
}
