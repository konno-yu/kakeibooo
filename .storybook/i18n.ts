import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resourceJap } from '../src/locale/resources_ja';
import { resourceEng } from '../src/locale/resources_en';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

const supportedLngs = ['en', 'ja'];
const resources = {
  ja: {
    translation: resourceJap,
  },
  en: {
    translation: resourceEng,
  },
};

void i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs,
  });

supportedLngs.forEach((lang) => {
  i18n.addResourceBundle(lang, 'common', require(`../src/locale/resources_${lang}.ts`));
});

export default i18n;
