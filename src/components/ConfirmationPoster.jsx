import { FoundersInvitation } from "../founders/FoundersLaunch";
import Palette from 'lucide-react/dist/esm/icons/palette.js';
import CalendarDays from 'lucide-react/dist/esm/icons/calendar-days.js';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js';
import Flower2 from 'lucide-react/dist/esm/icons/flower-2.js';
import Layers from 'lucide-react/dist/esm/icons/layers.js';
import { useI18n } from '../i18n/I18nProvider';
import { BouquetPhoto } from './BouquetCard';
import { vibes } from '../data';
import './ConfirmationPoster.css';
const inks = ['#df2874','#ed712b','#d49800','#008d96','#368b52','#f1646c','#073347'];
function PosterFlower({className, color, center='#ffd439', petals=14}) {
  return <svg className={`poster-flower ${className}`} viewBox="0 0 200 200" aria-hidden="true">
    {Array.from({length:petals},(_,i)=><ellipse key={i} cx="100" cy="54" rx={petals>10?14:24} ry="48" fill={color} transform={`rotate(${i*360/petals} 100 100)`}/>)}
    {Array.from({length:petals},(_,i)=><ellipse key={i} cx="100" cy="75" rx="7" ry="26" fill="#fffaf0" opacity=".18" transform={`rotate(${i*360/petals+10} 100 100)`}/>)}
    <circle cx="100" cy="100" r="25" fill={center}/>
    {[[-9,-6],[6,-10],[11,5],[-4,11]].map(([x,y],i)=><circle key={i} cx={100+x} cy={100+y} r="3" fill="#073347" opacity=".35"/>)}
  </svg>;
}
function PosterGarden() {
  return <div className="poster-garden" aria-hidden="true">
    <PosterFlower className="poster-pink" color="#f64c93" center="#ffc830"/>
    <PosterFlower className="poster-orange" color="#ff8b43" center="#c84661" petals={9}/>
    <PosterFlower className="poster-yellow" color="#ffd439" center="#e58b42" petals={11}/>
    <PosterFlower className="poster-coral" color="#ff849d" center="#ffc830" petals={7}/>
    <svg className="poster-leaves" viewBox="0 0 160 260"><path d="M95 250Q40 136 95 8" fill="none" stroke="#398853" strokeWidth="5"/><path d="M67 176Q-15 164 15 94Q87 114 67 176M76 118Q147 130 156 50Q85 54 76 118M90 221Q164 218 146 151Q88 162 90 221" fill="#79b96b"/></svg>
    <svg className="poster-teal" viewBox="0 0 200 230"><path d="M36 216Q-38 183 26 128Q-9 51 61 67Q59-19 111 19Q173-10 164 69Q230 86 169 143Q218 223 139 204Q94 269 36 216" fill="#8bcfca"/></svg>
    <svg className="poster-heart" viewBox="0 0 80 90"><path d="M42 77C-12 30 7 0 30 25C44-8 85 7 42 77Z" fill="none" stroke="#df2874" strokeWidth="4" strokeLinecap="round"/></svg>
    <div className="poster-scatter">{Array.from({length:12},(_,i)=><i key={i} style={{'--i':i,'--scatter-x':`${i%2 ? 94-(i%3)*2 : 3+(i%3)*2}%`,'--scatter-y':`${12+(i*13)%75}%`,'--petal-ink':inks[i%inks.length]}}/>)}</div>
  </div>;
}
export function ConfirmationPoster({data, titleRef, onBack, onHome, onFoundersStart}) {
  const { t } = useI18n();
  const confirmationHeadline = 'YOU HAVE BEEN FLOWERUPPED!';
  const fields = [
    [Flower2, 'style', t(`vibes.${data.vibe}`)],
    [Palette, 'colours', t(`colours.${data.colour}`)],
    [CalendarDays, 'frequency', t(`frequencies.${data.frequency}`)],
    [Layers, 'bouquets', data.quantity],
    [MapPin, 'delivery', `${data.name} · ${data.street} · ${data.postcode} ${t('common.city')}`],
  ];
  return <section className="confirmation-poster">
    <PosterGarden/>
    <div className="poster-content">
      <h1 className="poster-title" ref={titleRef} tabIndex={-1} lang="en" aria-label={confirmationHeadline}>
        <span className="poster-intro" aria-hidden="true">YOU HAVE BEEN</span>
        <span className="poster-big-word" aria-hidden="true">{[...'FLOWERUPPED!'].map((letter,i)=><span key={i} style={{color:inks[i%inks.length], '--letter-tilt':`${[-3,2,-2,3,-2,1][i%6]}deg`}}>{letter}</span>)}</span>
      </h1>
      <p className="poster-subtitle">{t(data.orderType === 'one_time' ? 'oneTime.confirmation' : 'steps.subtitles.6')} <span aria-hidden="true">♡</span>
        <svg viewBox="0 0 340 16" aria-hidden="true"><path d="M5 9Q153 0 334 8M56 14Q170 6 290 12" stroke="#ef709b" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
      </p>
      <aside className="poster-note poster-note-one">{t('confirmation.poster.noteOne')} <span aria-hidden="true">♡</span></aside>
      <article className="poster-match">
        <div className="poster-match-details">
          <h2>{t('confirmation.match')}</h2>
          <dl>{fields.map(([Icon,key,value],i)=><div className={`poster-attribute attribute-${key}`} key={key}>
            <Icon aria-hidden="true" style={{color:inks[i%inks.length]}} size={22} strokeWidth={1.8}/>
            <div><dt>{t(`confirmation.poster.${key}`)}</dt><dd>{value}</dd></div>
          </div>)}</dl>
          {data.message?.trim() && <div className="poster-message"><strong>{t('summary.messageTitle')}</strong><p>{data.message}</p></div>}
        </div>
        <div className="poster-bouquet"><BouquetPhoto variant={vibes.indexOf(data.vibe)}/><span className="poster-photo-flower" aria-hidden="true">✿</span></div>
      </article>
      <aside className="poster-note poster-note-two">{t('confirmation.poster.noteTwo')} <span aria-hidden="true">♡</span></aside>
      <p className="poster-prototype">{t('confirmation.preview')}<br/>{t('confirmation.noOrder')}</p>
      <FoundersInvitation data={data} onStart={onFoundersStart} onLater={onHome}/>

    </div>
  </section>;
}
