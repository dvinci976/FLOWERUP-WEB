import { useEffect, useId, useRef, useState } from 'react';
import { FlowerMark } from './FlowerMark';
import Check from 'lucide-react/dist/esm/icons/check.js';
import { useI18n } from '../i18n/I18nProvider';
import { languageCodes, languageNames } from '../i18n/core';
const flowerColors = ['#f64c8a', '#eebc20', '#54af73', '#f88359', '#26aab0', '#a37bc8'];
export function LanguageSelector() {
  const { language, changeLanguage, t } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef(null), trigger = useRef(null), menu = useRef(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('[aria-checked="true"]')?.focus();
    const outside = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return <div className="language-selector" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}} onKeyDown={e=>{
    if(e.key==='Escape'){e.preventDefault();close();}
  }}>
    <button type="button" className="language-trigger" ref={trigger} aria-label={`${t('common.language')} (${language.toUpperCase()})`} aria-haspopup="menu" aria-expanded={open} aria-controls={open?id:undefined} onClick={()=>setOpen(!open)} onKeyDown={e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();setOpen(true);}}}><FlowerMark color={flowerColors[languageCodes.indexOf(language)]}/><span>{language.toUpperCase()}</span></button>
    {open && <div id={id} ref={menu} className="language-menu" role="menu" aria-label={t('common.language')} onKeyDown={e=>{
      const options=[...menu.current.querySelectorAll('[role="menuitemradio"]')];
      let index=options.indexOf(document.activeElement);
      if(e.key==='ArrowDown')index=(index+1)%options.length;
      else if(e.key==='ArrowUp')index=(index-1+options.length)%options.length;
      else if(e.key==='Home')index=0;
      else if(e.key==='End')index=options.length-1;
      else return;
      e.preventDefault();options[index]?.focus();
    }}>{languageCodes.map((code,index)=><button key={code} type="button" role="menuitemradio" aria-checked={language===code} lang={code} style={{'--language-flower':flowerColors[index]}} onClick={()=>{changeLanguage(code);close();}}><span className="language-name"><FlowerMark color={flowerColors[index]}/>{languageNames[code]}</span>{language===code&&<Check size={15} aria-hidden="true"/>}</button>)}</div>}
  </div>;
}
