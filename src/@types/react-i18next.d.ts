import 'react-i18next';
import { resources as ns1 } from '../locale/resouces_ja';
import { resources as ns2 } from '../locale/resources_en';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: {
      ns1: typeof ns1;
      ns2: typeof ns2;
    };
  }
}
