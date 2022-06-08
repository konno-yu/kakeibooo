import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources as resourcesJa } from './locale/resouces_ja';
import { resources as resourcesEn } from './locale/resources_en';

const resources = {
  en: {
    translation: resourcesEn,
  },
  ja: {
    translation: resourcesJa,
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
