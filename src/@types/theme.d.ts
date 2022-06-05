import '@emotion/react';
import { Colors, FontSizes, FontWeights, Units } from '../theme/theme';

declare module '@emotion/react' {
  interface Theme {
    colors: { [T in Colors]: string };
    fontSizes: { [T in FontSizes]: string };
    fontWeights: { [T in FontWeights]: number };
    units: { [T in Units]: string };
  }
}
