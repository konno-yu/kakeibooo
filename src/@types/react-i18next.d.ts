import 'react-i18next';
import ns1 from '../locale/resources_ja.json';
import ns2 from '../locale/resources_en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: {
      ns1: typeof ns1;
      ns2: typeof ns2;
    };
  }
}
