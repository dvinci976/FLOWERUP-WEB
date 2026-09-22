import { useI18n } from "../i18n/I18nProvider";
import Check from "lucide-react/dist/esm/icons/check.js";
import { BouquetPhoto } from "./BouquetCard";
import { FlowerMark } from "./FlowerMark";

const accents = ["#3c9875", "#e966a0", "#eb713b", "#099f9f"];

function DiscoveryPalette() {
  return <svg className="discovery-palette" viewBox="0 0 240 240" aria-hidden="true">
    <circle cx="120" cy="120" r="120" fill="#fff0d8"/>
    <g transform="translate(120 115) rotate(-12)">
      {["#ff8db8", "#ffd75a", "#8acda5", "#78cdd3", "#f8ae7d"].map((colour, i) =>
        <ellipse key={colour} cx="0" cy="-48" rx="31" ry="49" transform={`rotate(${i * 72})`} fill={colour}/>
      )}
      <circle r="40" fill="#fffdf7"/>
      <text y="22" textAnchor="middle" fill="#cf296c" fontSize="71" fontFamily="Patrick Hand, cursive">?</text>
    </g>
    <path d="M30 61Q22 47 24 42M197 177Q207 178 212 186" stroke="#e988a8" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="192" cy="40" r="4" fill="#179c9f"/>
    <circle cx="50" cy="199" r="3" fill="#e9b53d"/>
  </svg>;
}

export function PaletteChoice({label,index,selected,onClick}) {
  const { t } = useI18n();
  return <button type="button" className={`palette-choice ${selected ? "is-selected" : ""}`} style={{"--palette-accent":accents[index]}} aria-pressed={selected} onClick={onClick}>
    <span className="palette-circle-wrap">
      <span className="palette-circle">
        {index === 3 ? <DiscoveryPalette/> : <BouquetPhoto variant={[3,1,2][index]}/>}
      </span>
      <span className="palette-check" aria-hidden="true"><FlowerMark color={accents[index]}/><Check/></span>
    </span>
    <strong>{label}</strong>
    <span className="palette-description">{t(`colourDescriptions.${index}`)}</span>
    {index === 3 && <span className="palette-adventure">{t('adventurous')}</span>}
  </button>;
}
