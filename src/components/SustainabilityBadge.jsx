import { useI18n } from "../i18n/I18nProvider";
import Leaf from "lucide-react/dist/esm/icons/leaf.js";
import Sprout from "lucide-react/dist/esm/icons/sprout.js";
import Heart from "lucide-react/dist/esm/icons/heart.js";
export function SustainabilityBadge({ variant = 0, compact = false }) {
  const { t } = useI18n();
  const Icon = [Sprout, Heart, Leaf][variant];
  return (
    <div
      className={`sustainability-badge badge-${variant} ${compact ? "compact" : ""}`}
    >
      <Icon strokeWidth={1.65} />
      <span>
        {!compact && (
          <strong>
            {t('sustainability.title')}
            <br />
            {t('sustainability.titleEnd')}
          </strong>
        )}
        <span>{t(`sustainability.statements.${variant}`)}</span>
      </span>
    </div>
  );
}
