import { useI18n } from "../i18n/I18nProvider";
import { FlowerMark } from "./FlowerMark";
import Check from "lucide-react/dist/esm/icons/check.js";
export const bouquetImages = ["wild", "romantic", "bright", "minimal"];
export function BouquetPhoto({ variant = 2, className = "", ...props }) {
  const { t } = useI18n();
  return (
    <img
      className={`bouquet-photo ${className}`}
      src={`/images/${bouquetImages[variant]}.jpg`}
      alt={t(`bouquetAlt.${variant}`)}
      {...props}
    />
  );
}
export function BouquetCard({
  label,
  index,
  selected,
  onClick,
  circular = false,
  vibeFeedback = false,
}) {
  const { t } = useI18n();
  return (
    <button
      className={`bouquet-card ${circular ? "circular-card" : ""} ${selected ? "is-selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="bouquet-card-image">
        <BouquetPhoto variant={circular ? [3, 1, 2, 0][index] : index} />
        {circular && index === 3 && <span className="surprise-flower">?</span>}
        <span className={`selection-check ${vibeFeedback ? "vibe-check" : ""}`} aria-hidden="true">
          {vibeFeedback && <FlowerMark color="#ff4086"/>}
          <Check size={17} />
        </span>
      </div>
      <strong>{label}</strong>
      {!circular && <small>{t(`vibeDescriptions.${index}`)}</small>}
      {vibeFeedback && <span className="vibe-that-is-me" aria-hidden="true">{t('thatIsMe')}</span>}
    </button>
  );
}
