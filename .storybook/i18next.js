import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['common'];
const supportedLngs = ['en', 'ja'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //debug: true,
    lng: 'ja',
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns,
    supportedLngs,
  });

supportedLngs.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResources(lang, n, require(`../src/locale/resources_${lang}.json`));
  });
});

export { i18n };
