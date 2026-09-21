import { ArrowRight } from "lucide-react";
export function Logo({ onClick }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Flowerup home">
      FLOWER<span>UP!</span>
      <span className="logo-flower">✿</span>
    </button>
  );
}
export function Button({ children, onClick, type = "button", ...props }) {
  return (
    <button type={type} className="primary" onClick={onClick} {...props}>
      {children}
      <ArrowRight size={19} />
    </button>
  );
}
