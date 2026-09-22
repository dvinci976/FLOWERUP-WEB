import { useI18n } from "../i18n/I18nProvider";
const ink = [
  "#fa4083",
  "#ffbb00",
  "#42a54d",
  "#08a2af",
  "#ff706b",
  "#ffac00",
  "#008c88",
  "#ff686e",
  "#0095a0",
];
export function FlowerupLogo({ onClick, large = false, decorative = false }) {
  const { t } = useI18n();
  const Tag = decorative ? "div" : "button";
  return (
    <Tag
      className={`flowerup-logo ${large ? "logo-large" : ""}`}
      onClick={onClick}
      aria-label={decorative ? 'Flowerup!' : t('common.home')}
    >
      <span className="wordmark" aria-hidden="true">
        {[..."Flowerup!"].map((letter, i) => (
          <span
            key={i}
            style={{
              color: ink[i],
              transform: `rotate(${[-7, 1, -5, 4, -4, 3, -3, 5, 9][i]}deg)`,
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className="brand-tagline">{t('tagline')}</span>
    </Tag>
  );
}
