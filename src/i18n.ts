import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resourceJap } from './locale/resources_ja';
import { resourceEng } from './locale/resources_en';

const resources = {
  ja: {
    translation: resourceJap,
  },
  en: {
    translation: resourceEng,
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'ja',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
