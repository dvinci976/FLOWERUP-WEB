import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Plus, MapPin, X } from "lucide-react";
import { vibes, colours, palettes, frequencies, money } from "./data";
import { Bouquet } from "./components/Bouquet";
import { Logo, Button } from "./components/UI";
import { Wheel } from "./components/Wheel";
const titles = [
  "What’s your flower vibe?",
  "What colours make you happy?",
  "How often?",
  "How many bouquets?",
  "Where should happiness arrive?",
  "Your little bundle of happy.",
  "You have been Flowerupped!",
];
const subtitles = [
  "Go with your first instinct. We’ll take it from here.",
  "Pick your palette. We’ll find the blooms.",
  "A little joy, on repeat. Choose your delivery rhythm.",
  "More flowers. Same doorstep.",
  "First stop: Lucerne, Switzerland.",
  "Just the way you like it. Ready to make your home bloom?",
  "Your home is already smiling.",
];
export function Onboarding({ close, initialVibe }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    vibe: initialVibe || "",
    colour: "",
    frequency: "Every 2 weeks",
    quantity: "1",
    name: "",
    street: "",
    postcode: "",
    city: "Lucerne",
  });
  const titleRef = useRef(null);
  const patch = (key, value) => setData((d) => ({ ...d, [key]: value }));
  useEffect(() => {
    titleRef.current?.focus();
    window.scrollTo(0, 0);
  }, [step]);
  const quantity = parseInt(data.quantity);
  const total = quantity * 24.9;
  const next = () => setStep((s) => s + 1);
  const canContinue = step === 0 ? data.vibe : step === 1 ? data.colour : true;
  return (
    <div className="onboarding">
      <header>
        <Logo onClick={close} />
        <span className="prototype-badge">LUCERNE · PROTOTYPE</span>
        <button
          className="icon-button"
          aria-label="Close onboarding"
          onClick={close}
        >
          <X />
        </button>
      </header>
      <main className={`flow-main ${step === 6 ? "confirmed" : ""}`}>
        <div className="progress-label">
          <span>
            {step === 6
              ? "ALL THE HAPPY. NONE OF THE HASSLE."
              : `YOUR FLOWER STORY · STEP ${step + 1} OF 7`}
          </span>
          <span>{step + 1}/7</span>
        </div>
        <div className="progress" aria-label={`Step ${step + 1} of 7`}>
          {titles.map((_, i) => (
            <span key={i} className={i <= step ? "done" : ""} />
          ))}
        </div>
        {step > 0 && step < 6 && (
          <button className="back" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <div className="flow-heading">
          {step === 6 && (
            <div className="confirmation-flower">
              ✿<span>✧</span>
              <i>✦</i>
            </div>
          )}
          <h1 ref={titleRef} tabIndex={-1}>
            {titles[step]}
          </h1>
          <p>{subtitles[step]}</p>
        </div>
        {step === 0 && (
          <div className="choice-grid">
            {vibes.map((v, i) => (
              <button
                key={v}
                aria-pressed={data.vibe === v}
                className={`visual-choice ${data.vibe === v ? "active" : ""}`}
                onClick={() => patch("vibe", v)}
              >
                <div className={`choice-art tone-${i}`}>
                  <Bouquet variant={i} />
                </div>
                <div className="choice-label">
                  {v}
                  <span>
                    {data.vibe === v ? <Check size={15} /> : <Plus size={15} />}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="choice-grid">
            {colours.map((c, i) => (
              <button
                key={c}
                aria-pressed={data.colour === c}
                className={`visual-choice colour-choice ${data.colour === c ? "active" : ""}`}
                onClick={() => patch("colour", c)}
              >
                <div className={`swatches tone-${i}`}>
                  {palettes[i].map((p, j) => (
                    <span
                      key={p}
                      style={{
                        background: p,
                        transform: `rotate(${j * 30 - 20}deg)`,
                      }}
                    >
                      ✿
                    </span>
                  ))}
                </div>
                <div className="choice-label">
                  {c}
                  <span>
                    {data.colour === c ? (
                      <Check size={15} />
                    ) : (
                      <Plus size={15} />
                    )}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <Wheel
            label="Delivery frequency"
            options={frequencies}
            value={data.frequency}
            onChange={(v) => patch("frequency", v)}
          />
        )}
        {step === 3 && (
          <>
            <Wheel
              label="Number of bouquets"
              options={["1", "2", "3", "4+"]}
              value={data.quantity}
              onChange={(v) => patch("quantity", v)}
            />
            <p className="price-note">
              {data.quantity === "4+" ? "From " : ""}
              {money(total)} per delivery
              {data.quantity === "4+"
                ? " · estimate for 4 bouquets. Final quantity to be agreed."
                : ""}
            </p>
          </>
        )}
        {step === 4 && (
          <form
            id="delivery-form"
            className="delivery-form"
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <div className="area-note">
              <MapPin size={20} />
              <span>
                A little local love. This prototype serves Lucerne city
                (6000–6009).
              </span>
            </div>
            <label>
              Your name
              <input
                autoComplete="name"
                required
                value={data.name}
                onChange={(e) => patch("name", e.target.value)}
                placeholder="Alex Bloom"
                maxLength={100}
                pattern=".*\S.*"
              />
            </label>
            <label>
              Street & house number
              <input
                autoComplete="street-address"
                required
                value={data.street}
                onChange={(e) => patch("street", e.target.value)}
                placeholder="Blumenstrasse 12"
                maxLength={200}
                pattern=".*\S.*"
              />
            </label>
            <div className="form-row">
              <label>
                Postcode
                <input
                  autoComplete="postal-code"
                  required
                  inputMode="numeric"
                  pattern="600[0-9]"
                  title="Enter a Lucerne city postcode from 6000 to 6009"
                  maxLength={4}
                  value={data.postcode}
                  onChange={(e) => patch("postcode", e.target.value)}
                  placeholder="6003"
                />
              </label>
              <label>
                City
                <input value="Lucerne" readOnly autoComplete="address-level2" />
              </label>
            </div>
            <p className="privacy-note">
              Demo only — your address stays in this page’s memory and is
              cleared on refresh. Nothing is sent or ordered.
            </p>
          </form>
        )}
        {step === 5 && (
          <div className="summary">
            <div className="summary-hero">
              <Bouquet variant={vibes.indexOf(data.vibe)} />
              <div>
                <span className="eyebrow">YOUR FLOWERUP! SUBSCRIPTION</span>
                <h2>{data.vibe}</h2>
                <p>{data.colour}</p>
              </div>
              <button className="edit" onClick={() => setStep(0)}>
                Edit
              </button>
            </div>
            <dl>
              <div>
                <dt>Your rhythm</dt>
                <dd>
                  {data.frequency}{" "}
                  <button className="edit" onClick={() => setStep(2)}>
                    Edit
                  </button>
                </dd>
              </div>
              <div>
                <dt>Bouquets per delivery</dt>
                <dd>
                  {data.quantity}{" "}
                  <button className="edit" onClick={() => setStep(3)}>
                    Edit
                  </button>
                </dd>
              </div>
              <div>
                <dt>Your doorstep</dt>
                <dd>
                  {data.name}
                  <br />
                  {data.street}
                  <br />
                  {data.postcode} Lucerne{" "}
                  <button className="edit" onClick={() => setStep(4)}>
                    Edit
                  </button>
                </dd>
              </div>
            </dl>
            <div className="summary-total">
              <div>
                <strong>
                  {data.quantity === "4+"
                    ? "Estimated from"
                    : "Prototype total"}
                </strong>
                <small>per delivery · {money(24.9)} per bouquet</small>
              </div>
              <strong>{money(total)}</strong>
            </div>
            {data.quantity === "4+" && (
              <p className="privacy-note">
                Estimate for 4 bouquets. Additional bouquets would be CHF 24.90
                each; final quantity to be agreed.
              </p>
            )}
            <p className="privacy-note">
              Provisional pricing. Delivery fees and final terms are not set.
              This is a demo — no payment and no real subscription.
            </p>
          </div>
        )}
        {step === 6 && (
          <div className="confirmation-body">
            <div className="confirmation-note">
              <Check />
              <div>
                <strong>Your perfect flower match is ready.</strong>
                <p>
                  {data.vibe} · {data.colour}
                  <br />
                  {data.quantity} bouquet{quantity > 1 ? "s" : ""} ·{" "}
                  {data.frequency.toLowerCase()}
                  <br />
                  Lucerne, Switzerland
                </p>
              </div>
            </div>
            <p>
              This was a little preview of Flowerup!
              <br />
              No order was placed and no payment was taken.
            </p>
            <Button onClick={close}>Back to the happy place</Button>
          </div>
        )}
        {step < 6 && (
          <div className="flow-bottom">
            <span>
              {step < 4
                ? "A few taps to a happier home."
                : step === 4
                  ? "Your doorstep, our next stop."
                  : "No payment needed. Just a little happy."}
            </span>
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
              {step === 5 ? "Flower me up" : "Continue"}
            </Button>
          </div>
        )}
      </main>
      <div className="flow-footer">
        FLOWERUP! <span>Made for your everyday.</span> ✿
      </div>
    </div>
  );
}
