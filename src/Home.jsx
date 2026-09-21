import { ArrowRight, Check, Heart, Truck, Leaf, MapPin } from "lucide-react";
import { vibes } from "./data";
import { Bouquet } from "./components/Bouquet";
import { Logo, Button } from "./components/UI";
export function Home({ start }) {
  return (
    <>
      <div className="announcement">
        A little happiness, delivered. <span>Starting in Lucerne ♡</span>
      </div>
      <header>
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        <nav>
          <a href="#how">How it works</a>
          <a href="#thoughtful">A little more thoughtful</a>
        </nav>
        <button className="nav-cta" onClick={start}>
          Find your flowers <ArrowRight size={16} />
        </button>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> FRESH FLOWERS. GOOD MOOD.
            </div>
            <h1>
              Make your
              <br />
              home{" "}
              <span className="bloom">
                bloom
                <svg viewBox="0 0 300 20" aria-hidden="true">
                  <path d="M5 13 Q120 -2 290 10" />
                </svg>
              </span>
              <span className="pink-dot">.</span>
            </h1>
            <p>
              Fresh flowers selected for your taste and delivered regularly to
              your home. A little everyday joy, without the big occasion.
            </p>
            <div className="hero-price">
              From CHF 24.90 <span>/ bouquet</span>
            </div>
            <Button onClick={start}>Flower me up</Button>
            <div className="micro">
              <Check size={15} /> Your vibe. Your rhythm. Your flowers.
            </div>
          </div>
          <div className="hero-art">
            <div className="art-caption">
              YOUR EVERYDAY, BUT A LITTLE BRIGHTER.
            </div>
            <div className="happy-stamp">
              hello,
              <br />
              <strong>happy home.</strong>
              <span>☺</span>
            </div>
            <Bouquet variant={2} hero />
            <div className="handwritten">
              a little bloom goes a long way <span>↗</span>
            </div>
            <div className="price-sticker">
              a fresh start
              <br />
              <strong>24.90</strong>
              <span>CHF / BOUQUET</span>
            </div>
            <span className="art-spark">✧</span>
          </div>
        </section>
        <div className="benefit-strip">
          <span>
            <Heart /> Made for your taste
          </span>
          <span>
            <Truck /> Delivered to your doorstep
          </span>
          <span>
            <Leaf /> Thoughtfully planned
          </span>
          <span className="lucerne">
            <MapPin /> First stop: Lucerne
          </span>
        </div>
        <section id="how" className="how-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">LESS EFFORT. MORE FLOWERS.</div>
              <h2>
                Your kind of flowers.
                <br />
                In three happy little steps.
              </h2>
            </div>
            <p>
              No flower expertise required.
              <br />
              Just follow your happy.
            </p>
          </div>
          <div className="how-grid">
            {[
              [
                "01",
                "Find your vibe",
                "Wild, romantic, bright or minimal. Pick the flowers that feel like you.",
                "✿",
              ],
              [
                "02",
                "Set your rhythm",
                "A weekly pick-me-up or a monthly treat. Make room for a little joy.",
                "↻",
              ],
              [
                "03",
                "Let happiness arrive",
                "We take it from here. Fresh flowers, right to your Lucerne doorstep.",
                "⌂",
              ],
            ].map(([n, title, copy, icon]) => (
              <article key={n}>
                <div className="step-card-top">
                  <span>{n}</span>
                  <span>{icon}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="vibes-section">
          <div className="eyebrow">THERE’S NO WRONG KIND OF FLOWER PERSON.</div>
          <h2>A little wild? A little romantic?</h2>
          <p>Whatever your vibe, there’s a bloom for that.</p>
          <div className="vibe-preview">
            {vibes.map((v, i) => (
              <button key={v} onClick={() => start(v)}>
                <div>
                  <Bouquet variant={i} />
                  <span className="small-circle">
                    <ArrowRight size={19} />
                  </span>
                </div>
                <h3>{v}</h3>
              </button>
            ))}
          </div>
        </section>
        <section id="thoughtful" className="sustainability">
          <div className="leaf-drawing">
            ✳
            <span>
              small choices,
              <br />a little more care.
            </span>
          </div>
          <div>
            <div className="eyebrow">GOOD FLOWERS. THOUGHTFUL CHOICES.</div>
            <h2>
              More joy.
              <br />A little less waste.
            </h2>
            <p>
              Beautiful flowers should come with a little consideration. Here’s
              what we’re working towards as Flowerup! takes root.
            </p>
            <ul>
              <li>
                <Check /> Seasonal flowers where possible
              </li>
              <li>
                <Check /> A commitment to responsible sourcing
              </li>
              <li>
                <Check /> Subscription planning to help reduce unnecessary
                flower waste
              </li>
            </ul>
            <small>
              Our approach, not a certification. We’ll share more as we grow.
            </small>
          </div>
        </section>
        <section className="closing">
          <span>✿</span>
          <h2>
            Your home called.
            <br />
            It would love some flowers.
          </h2>
          <Button onClick={start}>Flower me up</Button>
          <p>A few taps. A whole lot of happy.</p>
        </section>
      </main>
      <footer>
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        <p>Make your home bloom.</p>
        <span>Made with ♡ for Lucerne · Prototype</span>
      </footer>
    </>
  );
}
