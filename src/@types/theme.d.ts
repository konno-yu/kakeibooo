import '@emotion/react';
import { Colors, FontSizes, FontWeights } from '../theme/theme';

declare module '@emotion/react' {
  interface Theme {
    colors: { [T in Colors]: string };
    fontSizes: { [T in FontSizes]: string };
    fontWeights: { [T in FontWeights]: number };
  }
}
