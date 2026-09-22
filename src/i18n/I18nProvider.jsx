import { createContext, useContext, useEffect, useState } from 'react';
import en from './locales/en.json';
import de from './locales/de.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import { detectLanguage, languageCodes, resolveTranslation, STORAGE_KEY } from './core';
const messages = { en, de, it, fr, es, pt };
const I18nContext = createContext(null);
function initialLanguage() {
  let saved;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* Storage may be blocked. */ }
  return detectLanguage(saved, typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language]);
}
export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const t = (key, variables) => resolveTranslation(messages, language, key, variables);
  const changeLanguage = (code) => {
    if (!languageCodes.includes(code)) return;
    setLanguage(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* Still switch for this session. */ }
  };
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = resolveTranslation(messages, language, 'pageTitle');
    document.querySelector('meta[name="description"]')?.setAttribute('content', resolveTranslation(messages, language, 'pageDescription'));
  }, [language]);
  return <I18nContext.Provider value={{ language, changeLanguage, t }}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n requires I18nProvider');
  return value;
}
