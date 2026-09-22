import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
export { FlowerupLogo as Logo } from "./FlowerupLogo";
export function Button({ children, onClick, type = "button", ...props }) {
  return (
    <button type={type} className="primary" onClick={onClick} {...props}>
      {children}
      <ArrowRight size={19} />
    </button>
  );
}
