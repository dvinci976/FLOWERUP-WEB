import { useI18n } from "../i18n/I18nProvider";
export function ProgressIndicator({ step, total = 7 }) {
  const { t } = useI18n();
  return (
    <div className="progress-indicator">
      <span className="progress-caption">{t('steps.story')}</span>
      <div
        role="progressbar"
        aria-label={t('steps.progress')}
        aria-valuetext={t('steps.progressValue', {step:step+1,total})}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
        className="progress-track"
      >
        <span style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <span>
        {step + 1}/{total}
      </span>
    </div>
  );
}
