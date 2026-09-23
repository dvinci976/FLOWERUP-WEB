import { pricing } from './pricing';
import { money } from './data';
import { FlowerGraphics } from "./components/FlowerGraphics";
import { useI18n } from "./i18n/I18nProvider";
import { LanguageSelector } from "./components/LanguageSelector";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import Heart from "lucide-react/dist/esm/icons/heart.js";
import Truck from "lucide-react/dist/esm/icons/truck.js";
import Leaf from "lucide-react/dist/esm/icons/leaf.js";
import MapPin from "lucide-react/dist/esm/icons/map-pin.js";
import { vibes } from "./data";
import { BouquetPhoto, BouquetCard } from "./components/BouquetCard";
import { FlowerupLogo } from "./components/FlowerupLogo";
import { FlowerMark, HappyMarks } from "./components/FlowerMark";
import { SustainabilityBadge } from "./components/SustainabilityBadge";
import { Logo, Button } from "./components/UI";
export function Home({ start }) {
  const { t } = useI18n();
  const scrollHome = () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
  return (
    <>
      <div className="announcement">
        {t('home.announcement')} <span>{t('home.launch')}</span>
      </div>
      <header>
        <Logo onClick={scrollHome} />
        <nav>
          <a href="#how">{t('home.howLink')}</a>
          <a href="#thoughtful">{t('home.thoughtfulLink')}</a>
        </nav>
        <div className="header-actions"><button className="nav-cta" onClick={start}>
          {t('home.find')} <ArrowRight size={16} />
        </button><LanguageSelector/></div>
      </header>
      <main>
        <section className="hero">
          <FlowerGraphics/>
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> {t('home.eyebrow')}
            </div>
            <FlowerupLogo large onClick={start} />
            <h1>
              {t('home.heroFirst')}
              <br />
              <span>{t('home.heroSecond')}</span>
            </h1>
            <p>
              {t('home.intro')}
              <br />
              {t('home.introEnd')}
            </p>
            <div className="hero-price">
              {t('common.from')} {money(pricing.recurringPrice)} <span>{t('common.perBouquet')}</span>
            </div>
            <Button onClick={start}>{t('common.cta')}</Button>
            <div className="micro">
              <Check size={15} /> {t('home.micro')}
            </div>
          </div>
          <div className="hero-art">
            <BouquetPhoto
              variant={2}
              className="hero-bouquet"
              fetchPriority="high"
            />
            <div className="handwritten">
              {t('home.small')}
              <br />
              {t('home.happy')}<span>♡</span>
            </div>
            <div className="price-sticker">
              {t('common.from')}<strong>{money(pricing.recurringPrice)}</strong>
            </div>
            <HappyMarks className="hero-marks" />
            <FlowerMark className="hero-flower" color="#ff94bd" />
          </div>
        </section>
        <div className="benefit-strip" id="thoughtful">
          {[0, 1, 2].map((i) => (
            <SustainabilityBadge key={i} variant={i} compact />
          ))}
        </div>
        <section id="how" className="how-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{t('home.howEyebrow')}</div>
              <h2>
                {t('home.howTitle')}
                <br />
                {t('home.howTitleEnd')}
              </h2>
            </div>
            <p>
              {t('home.howIntro')}
              <br />
              {t('home.howIntroEnd')}
            </p>
          </div>
          <div className="how-grid">
            {['✿','↻','⌂'].map((icon,i) => {
              const n=String(i+1).padStart(2,'0');
              return (
              <article key={n}>
                <div className="step-card-top">
                  <span>{n}</span>
                  <span>{icon}</span>
                </div>
                <h3>{t(`home.howTitles.${i}`)}</h3>
                <p>{t(`home.howCopies.${i}`)}</p>
              </article>
            );})}
          </div>
        </section>
        <section className="vibes-section">
          <div className="eyebrow">{t('home.vibesEyebrow')}</div>
          <h2>{t('home.vibesTitle')}</h2>
          <p>{t('home.vibesIntro')}</p>
          <div className="vibe-preview">
            {vibes.map((v, i) => (
              <BouquetCard
                key={v}
                label={t(`vibes.${v}`)}
                index={i}
                onClick={() => start(v)}
              />
            ))}
          </div>
        </section>
        <div className="kind-note">
          <SustainabilityBadge variant={2} />
          <p>
            {t('home.kindNote')}
          </p>
        </div>
        <section className="closing">
          <FlowerMark className="closing-flower" />
          <h2>
            {t('home.closing')}
            <br />
            {t('home.closingEnd')}
          </h2>
          <Button onClick={start}>{t('common.cta')}</Button>
          <p>{t('home.closingNote')}</p>
        </section>
      </main>
      <footer>
        <Logo onClick={scrollHome} />
        <p>{t('tagline')}</p>
        <span>{t('home.footer')}</span>
      </footer>
    </>
  );
}
