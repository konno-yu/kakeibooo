import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesJa from './locale/resources_ja.json';
import resourcesEn from './locale/resources_en.json';

const resources = {
  en: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    translation: resourcesEn,
  },
  ja: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
