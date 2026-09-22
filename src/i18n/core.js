export const languageNames = { en: 'English', de: 'Deutsch', it: 'Italiano', fr: 'Français', es: 'Español', pt: 'Português' };
export const languageCodes = Object.keys(languageNames);
export const STORAGE_KEY = 'flowerup.language';
export function detectLanguage(saved, browserLanguages = []) {
  if (languageCodes.includes(saved)) return saved;
  for (const candidate of browserLanguages) {
    const code = String(candidate).toLowerCase().split(/[-_]/)[0];
    if (languageCodes.includes(code)) return code;
  }
  return 'en';
}
export function resolveTranslation(messages, language, key, variables = {}) {
  const read = (locale) => key.split('.').reduce((value, part) => value?.[part], messages[locale]);
  const value = read(language) ?? read('en');
  if (typeof value !== 'string') throw new Error(`Missing translation: ${language}:${key}`);
  return value.replace(/\{(\w+)\}/g, (match, name) => variables[name] == null ? match : String(variables[name]));
}
