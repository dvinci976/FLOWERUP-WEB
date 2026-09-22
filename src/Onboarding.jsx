import { ConfirmationPoster } from "./components/ConfirmationPoster";
import { FlowerGraphics, DeliveryDoodle } from "./components/FlowerGraphics";
import { useI18n } from "./i18n/I18nProvider";
import { LanguageSelector } from "./components/LanguageSelector";
import { validateDelivery } from "./deliveryValidation";
import { useEffect, useRef, useState } from "react";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import MapPin from "lucide-react/dist/esm/icons/map-pin.js";
import X from "lucide-react/dist/esm/icons/x.js";
import { vibes, colours, frequencies, money } from "./data";
import { PaletteChoice } from "./components/PaletteChoice";
import { BouquetPhoto, BouquetCard } from "./components/BouquetCard";
import { SustainabilityBadge } from "./components/SustainabilityBadge";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { FlowerMark, HappyMarks } from "./components/FlowerMark";
import { Logo, Button } from "./components/UI";
import { PetalWheel } from "./components/PetalWheel";
export function Onboarding({ close, initialVibe }) {
  const { t } = useI18n();
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    vibe: initialVibe || "",
    colour: "",
    frequency: "fortnightly",
    quantity: "1",
    name: "",
    street: "",
    postcode: "",
    city: "Lucerne",
    message: "",
  });
  const titleRef = useRef(null);
  const patch = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((previous) => { const next = {...previous}; delete next[key]; return next; });
  };
  useEffect(() => {
    titleRef.current?.focus();
    window.scrollTo(0, 0);
  }, [step]);
  const quantity = parseInt(data.quantity);
  const total = quantity * 24.9;
  const next = () => setStep((s) => s + 1);
  const canContinue = step === 0 ? data.vibe : step === 1 ? data.colour : true;
  return (
    <div className={`onboarding flow-step-${step}`}>
      <header>
        <Logo onClick={close} />
        <span className="prototype-badge">{t("common.prototype")}</span>
        <div className="header-actions"><LanguageSelector/>
        <button
          className="icon-button"
          aria-label={t("common.close")}
          onClick={close}
        >
          <X />
        </button></div>
        <div className="onboarding-navigation">

          <ProgressIndicator step={step}/>
        </div>
      </header>
      <main className={`flow-main ${step === 6 ? "confirmed" : ""}`}>
        {step !== 6 && <FlowerGraphics variant={step}/>}

        {step !== 6 && <div className="flow-heading">
          <h1 ref={titleRef} tabIndex={-1}>{t(`steps.titles.${step}`)}</h1>
          <p>{t(`steps.subtitles.${step}`)}</p>
        </div>}
        {step === 0 && (
          <div className="choice-grid">
            {vibes.map((v, i) => (
              <BouquetCard
                key={v}
                label={t(`vibes.${v}`)}
                index={i}
                vibeFeedback
                selected={data.vibe === v}
                onClick={() => patch("vibe", v)}
              />
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="palette-choices">
            {colours.map((c, i) => (
              <PaletteChoice key={c} label={t(`colours.${c}`)} index={i} selected={data.colour === c} onClick={() => patch("colour", c)}/>
            ))}
          </div>
        )}
        {step === 2 && (
          <PetalWheel
            label={t("wheel.frequency")}
            optionLabel={option => t(`frequencies.${option}`)}
            options={frequencies}
            value={data.frequency}
            onChange={(v) => patch("frequency", v)}
          />
        )}
        {step === 2 && (
          <>
            <p className="rhythm-note">
              {t('steps.pause')}
            </p>
            <SustainabilityBadge variant={2} />
          </>
        )}
        {step === 3 && (
          <>
            <PetalWheel
              label={t("wheel.quantity")}
              options={["1", "2", "3", "4+"]}
              value={data.quantity}
              onChange={(v) => patch("quantity", v)}
            />
            <p className="price-note">
              {data.quantity === '4+' ? `${t('common.from')} ` : ''}{money(total)} {t('common.perDelivery')}
              {data.quantity === '4+' ? t('summary.fourNote') : ''}
            </p>
          </>
        )}
        {step === 4 && (
          <form id="delivery-form" className="delivery-form" noValidate onSubmit={event => {
            event.preventDefault();
            const nextErrors = validateDelivery(data);
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length) {
              event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
              return;
            }
            next();
          }}>
            <DeliveryDoodle/>
            <div className="area-note"><MapPin size={20}/><span>{t('delivery.area')}</span></div>
            {['name','street'].map(field => <label key={field}>
              {t(`delivery.${field}`)}
              <input name={field} autoComplete={field==='name'?'name':'street-address'} required value={data[field]} onChange={event=>patch(field,event.target.value)} placeholder={t(`delivery.${field}Placeholder`)} maxLength={field==='name'?100:200} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field]?`${field}-error`:undefined}/>
              {errors[field] && <span className="field-error" id={`${field}-error`} role="alert">{t(errors[field])}</span>}
            </label>)}
            <div className="form-row">
              <label>{t('delivery.postcode')}
                <input name="postcode" autoComplete="postal-code" required inputMode="numeric" pattern="600[0-9]" title={t('delivery.postcodeHint')} maxLength={4} value={data.postcode} onChange={event=>patch('postcode',event.target.value)} placeholder="6003" aria-invalid={Boolean(errors.postcode)} aria-describedby={errors.postcode?'postcode-error':undefined}/>
                {errors.postcode && <span className="field-error" id="postcode-error" role="alert">{t(errors.postcode)}</span>}
              </label>
              <label>{t('delivery.city')}<input value={t('common.city')} readOnly autoComplete="address-level2"/></label>
            </div>
            <p className="privacy-note">{t('delivery.privacy')}</p>
          </form>
        )}
        {step === 5 && (
          <div className="summary">
            <div className="summary-hero">
              <BouquetPhoto variant={vibes.indexOf(data.vibe)} />
              <div>
                <span className="eyebrow">{t('summary.subscription')}</span>
                <h2>{t(`vibes.${data.vibe}`)}</h2>
                <p>{t(`colours.${data.colour}`)}</p>
              </div>
              <button className="edit" onClick={() => setStep(0)}>
                {t('common.edit')}
              </button>
            </div>
            <dl>
              <div>
                <dt>{t('summary.rhythm')}</dt>
                <dd>
                  {t(`frequencies.${data.frequency}`)}{" "}
                  <button className="edit" onClick={() => setStep(2)}>
                    {t('common.edit')}
                  </button>
                </dd>
              </div>
              <div>
                <dt>{t('summary.quantity')}</dt>
                <dd>
                  {data.quantity}{" "}
                  <button className="edit" onClick={() => setStep(3)}>
                    {t('common.edit')}
                  </button>
                </dd>
              </div>
              <div>
                <dt>{t('summary.doorstep')}</dt>
                <dd>
                  {data.name}
                  <br />
                  {data.street}
                  <br />
                  {data.postcode} {t('common.city')}{' '}
                  <button className="edit" onClick={() => setStep(4)}>
                    {t('common.edit')}
                  </button>
                </dd>
              </div>
            </dl>
            <label className="summary-message">
              <span>{t('summary.messageLabel')}</span>
              <textarea rows={3} maxLength={300} value={data.message} onChange={event => patch('message', event.target.value)} placeholder={t('summary.messagePlaceholder')} aria-describedby="message-hint"/>
              <small id="message-hint">{t('summary.messageHint')}</small>
            </label>
            <div className="summary-total">
              <div>
                <strong>
                  {data.quantity === "4+"
                    ? t('summary.estimated')
                    : t('summary.total')}
                </strong>
                <small>{t('summary.unit', {price:money(24.9)})}</small>
              </div>
              <strong>{money(total)}</strong>
            </div>
            {data.quantity === "4+" && (
              <p className="privacy-note">
                {t('summary.fourDetails', {price:money(24.9)})}
              </p>
            )}
            <p className="privacy-note">
              {t('summary.disclaimer')}
            </p>
          </div>
        )}
        {step === 6 && <ConfirmationPoster data={data} titleRef={titleRef} onBack={() => setStep(5)} onHome={close}/>}
        {step < 6 && (
          <div className="flow-bottom">
            {step !== 0 && step !== 1 && <span>
              {step < 4
                ? t('steps.fewTaps')
                : step === 4
                  ? t('steps.doorstep')
                  : t('steps.noPayment')}
            </span>}
            <div className="step-actions">
              <button type="button" className="onboarding-back" onClick={() => step === 0 ? close() : setStep(s => s-1)}><ArrowLeft size={19} aria-hidden="true"/> {t('common.back')}</button>
            <Button
              disabled={!canContinue}
              type={step === 4 ? "submit" : "button"}
              form={step === 4 ? "delivery-form" : undefined}
              onClick={
                step === 4
                  ? undefined
                  : (event) => {
                      event.preventDefault();
                      next();
                    }
              }
            >
              {step === 5 ? t('common.cta') : t('common.continue')}
            </Button>
            </div>
          </div>
        )}
        {step === 1 && <p className="palette-seasonal-note">{t('seasonalNote')}</p>}
      </main>
      <div className="flow-footer">
        Flowerup! <span>{t('steps.footer')}</span> ✿
      </div>
    </div>
  );
}
