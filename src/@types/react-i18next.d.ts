import 'react-i18next';
import { resourceJap } from '../locale/resources_ja';
import { resourceEng } from '../locale/resources_en';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: {
      ns1: typeof resourceJap;
      ns2: typeof resourceEng;
    };
  }
}
