import { getOrder, pricing } from '../pricing';
import { useEffect, useRef, useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import { useI18n } from '../i18n/I18nProvider';
import { FlowerMark } from '../components/FlowerMark';
import { GardenFlower } from '../components/FlowerGraphics';
import { BouquetPhoto } from '../components/BouquetCard';
import { Button } from '../components/UI';
import { vibes, money } from '../data';
import { purchaseIntents } from './state';
import './founders.css';

export function FoundingBloomBadge() {
  const { t } = useI18n();
  return <div className="founding-bloom-badge"><FlowerMark/><span>{t('founders.invitationBadge')}</span></div>;
}
export function FoundersInvitation({ onStart, onLater }) {
  const { t } = useI18n();
  return <section className="founders-invitation first-bloom" aria-labelledby="founders-invite-title">
    <div className="first-bloom-garden" aria-hidden="true">
      <FlowerMark color="#f45191"/><GardenFlower kind="daisy"/>
      <svg viewBox="0 0 100 100"><path d="M48 89Q9 56 20 34Q31 18 47 41Q64 5 82 25Q98 46 48 89Z" fill="none" stroke="#e7337a" strokeWidth="4" strokeLinecap="round"/></svg>
    </div>
    <div className="first-bloom-copy">
      <div className="first-bloom-badge"><FlowerMark color="#ef4383"/><span>{t('founders.invitationBadge')}</span></div>
      <h2 id="founders-invite-title">{t('founders.inviteTitle').split(' ').map((word,i)=><span key={i}>{word}{' '}</span>)}</h2>
      <p className="founders-handwritten first-bloom-promise">{t('founders.firstHomes')}</p>
      <div className="first-bloom-actions">
        <p className="founders-invite-note">{t('founders.noPayment')}</p>
        <div className="founders-invite-actions"><Button onClick={onStart}>{t('founders.yes')}</Button><button className="founders-text-button" type="button" onClick={onLater}>{t('founders.later')}</button></div>
      </div>
    </div>
    <div className="first-bloom-photo">
      <BouquetPhoto variant={2}/>
      <div className="first-bloom-price"><span>{t('common.from')}</span><strong>{money(pricing.marketingFromPrice)}</strong><span>{t('founders.invitationPriceNote')}</span></div>
      <svg className="first-bloom-photo-marks" viewBox="0 0 130 80" aria-hidden="true"><path d="M23 53Q5 10 18 8Q35 7 36 50M56 48Q50 2 66 7Q77 14 68 48M86 56Q108 18 119 30Q126 44 93 65" fill="#ff8a43"/></svg>
    </div>
  </section>;
}
export function FoundersProgress({ stage }) {
  const { t } = useI18n();
  const current = ['signup','intent','thanks'].indexOf(stage);
  return <div className="founders-progress" aria-label={t('founders.progress')}>
    <span>{t('founders.launch')}</span>
    <div aria-hidden="true">{[0,1,2].map(i=><i key={i} className={i<=current?'is-complete':''}/>)}</div>
    <strong>{t(`founders.stages.${stage}`)}</strong>
  </div>;
}
function ConfiguredBloom({ data }) {
  const { t } = useI18n();
  const order = getOrder(data);
  return <aside className="configured-bloom" aria-label={t('founders.yourBloom')}>
    <div className="configured-photo"><BouquetPhoto variant={vibes.indexOf(data.vibe)}/><span aria-hidden="true">♡</span></div>
    <div className="configured-details"><p className="founders-handwritten">{t('founders.yourBloom')}</p>
      <dl>{[
        ['style',t(`vibes.${data.vibe}`)],['colours',t(`colours.${data.colour}`)],
        ['frequency',t(`frequencies.${data.frequency}`)],['bouquets',data.quantity],
      ].map(([key,value])=><div key={key}><dt>{t(`confirmation.poster.${key}`)}</dt><dd>{value}</dd></div>)}</dl>
      <strong className="configured-price">{data.quantity==='4+' ? `${t('common.from')} ` : ''}{money(order.total)} <span>{t(order.orderType === 'one_time' ? 'oneTime.delivered' : 'common.perDelivery')}</span></strong>
      <small>{t('founders.provisional')} · {t('founders.deliveryIncluded')}</small>
      {data.quantity==='4+' && <small>{t('summary.fourDetails',{price:money(data.pricePerBouquet)})}</small>}
    </div>
  </aside>;
}
export function FoundersLaunch({ data, state, dispatch, titleRef, onHome }) {
  const { t } = useI18n();
  const intentOffer = t('founders.intentOffer', {price:money(pricing.marketingFromPrice)});
  const intentQuestion = t('founders.intentTitle', {offer:intentOffer});
  const intentParts = t('founders.intentTitle', {offer:'|OFFER|'}).split('|OFFER|');
  const formRef = useRef(null);
  const [bloomingIntent, setBloomingIntent] = useState(null);
  useEffect(() => {
    if (!bloomingIntent || state.stage !== 'intent') {
      if (bloomingIntent) setBloomingIntent(null);
      return;
    }
    const timer = setTimeout(() => {
      dispatch({ type: 'answer', value: bloomingIntent });
      setBloomingIntent(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [bloomingIntent, dispatch, state.stage]);
  const signupTitle = t('founders.signupTitle').split(t('founders.signupAccent')); 
  useEffect(() => {
    const firstError = Object.keys(state.errors)[0];
    if (firstError) formRef.current?.elements.namedItem(firstError)?.focus();
  }, [state.errors]);
  const back = <button type="button" className="onboarding-back" onClick={()=>dispatch({type:'back'})}><ArrowLeft size={18} aria-hidden="true"/>{t('common.back')}</button>;
  return <section className={`founders-screen founders-${state.stage}`}>
    <div className="founders-garden" aria-hidden="true"><GardenFlower kind="daisy"/><FlowerMark color="#f6a3c3"/><GardenFlower kind="tulip"/></div>
    <div className="founders-content">
      {state.stage==='signup' ? <>
        <div className="founders-heading"><FoundingBloomBadge/><p className="founders-handwritten">{t('founders.hello')}</p>
          <h1 ref={titleRef} tabIndex={-1}>{signupTitle[0]}<span className="signup-bloom-word">{[...t('founders.signupAccent')].map((letter,i)=><span key={i}>{letter}</span>)}</span>{signupTitle.slice(1).join(t('founders.signupAccent'))}</h1><p>{t('founders.signupCopy')}</p>
        </div>
        <div className="founders-signup-grid">
          <ConfiguredBloom data={data}/>
          <form ref={formRef} className="founders-form" noValidate onSubmit={event=>{event.preventDefault();dispatch({type:'submit'});}}>
            <span className="signup-form-flower" aria-hidden="true"><FlowerMark color="#f16ca2"/></span>
            <svg className="signup-form-heart" viewBox="0 0 80 90" aria-hidden="true"><path d="M42 77C-12 30 7 0 30 25C44-8 85 7 42 77Z" fill="none" stroke="#159d99" strokeWidth="4" strokeLinecap="round"/></svg>
            {['firstName','email','postcode'].map(field=><label key={field} htmlFor={`founders-${field}`}>
              <span>{t(`founders.fields.${field}`)}</span>
              <input id={`founders-${field}`} name={field} type={field==='email'?'email':'text'} inputMode={field==='postcode'?'numeric':field==='email'?'email':'text'} autoComplete={{firstName:'given-name',email:'email',postcode:'postal-code'}[field]} autoCapitalize={field==='email'?'none':undefined} spellCheck={field==='email'?false:undefined} required maxLength={field==='postcode'?4:field==='email'?254:80} value={state[field]} onChange={event=>dispatch({type:'change',field,value:event.target.value})} aria-invalid={Boolean(state.errors[field])} aria-describedby={state.errors[field]?`founders-${field}-error`:undefined}/>
              {state.errors[field]&&<span className="field-error" role="alert" id={`founders-${field}-error`}>{t(state.errors[field])}</span>}
            </label>)}
            <div className="step-actions founders-actions">{back}<Button type="submit">{t('founders.submit')}</Button></div>
            <p className="founders-small">{t('founders.noSpam')}</p>
            <p className="signup-preview-note">{t('founders.preview')}</p>
          </form>
        </div>
      </> : <div className="founders-moment">
        {state.stage==='intent' ? <>
          <FoundingBloomBadge/>
          <h1 ref={titleRef} tabIndex={-1} className="intent-celebration" aria-label={t('founders.successTitle')}><span aria-hidden="true">{[...t('founders.successTitle')].map((letter,i)=><span key={i}>{letter}</span>)}</span></h1>
          <p className="intent-welcome">{t('founders.partOfBloom')}</p>
          <p className="intent-promise">{t('founders.successCopy')}</p>
          <p className="founders-handwritten founders-last-thing">{t('founders.lastThing')}</p>
          <h2 className="intent-question">{intentParts[0]}<mark className="intent-marketing-offer">{intentOffer}</mark>{intentParts[1]}</h2>
          <div className="intent-choices" role="group" aria-label={intentQuestion}>
            {purchaseIntents.map(intent=><button type="button" key={intent} className={`intent-choice intent-${intent}${bloomingIntent===intent?' is-blooming':''}`} aria-pressed={(bloomingIntent || state.purchaseIntent)===intent} disabled={Boolean(bloomingIntent)} onClick={()=>setBloomingIntent(intent)}>
              <svg className="intent-flower-shape" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
                <g fill="currentColor">
                  {[0,45,90,135,180,225,270,315].map(angle=><ellipse key={angle} cx="100" cy="53" rx="25" ry="47" transform={`rotate(${angle} 100 100)`}/>)}
                  <circle cx="100" cy="100" r="55"/>
                </g>
                <circle className="intent-flower-centre" cx="100" cy="100" r="48" fill="#fffdf6" fillOpacity=".24"/>
              </svg>
              <strong>{t(`founders.answers.${intent}`)}</strong>
            </button>)}
          </div>
          <svg className="intent-heart" viewBox="0 0 80 90" aria-hidden="true"><path d="M42 77C-12 30 7 0 30 25C44-8 85 7 42 77Z" fill="none" stroke="currentColor" strokeWidth="4"/></svg>
          <div className="founders-back-only">{back}</div>
        </> : <>
          <div className="founders-moment-flower" aria-hidden="true"><FlowerMark color="#ef7d42"/></div>
          <h1 ref={titleRef} tabIndex={-1}>{t('founders.thanksTitle')}</h1>
        </>}
        {state.stage==='thanks' && <>
          <p>{t('founders.thanksCopy')}</p><p className="founders-handwritten founders-see-you">{t('founders.seeYou')}</p>
          <div className="step-actions founders-actions">{back}<Button onClick={onHome}>{t('confirmation.home')}</Button></div>
        </>}
      </div>}
    </div>
  </section>;
}
