import '@emotion/react';
import { Colors, FontSizes } from '../theme/theme';

declare module '@emotion/react' {
  interface Theme {
    colors: { [T in Colors]: string };
    fontSizes: { [T in FontSizes]: string };
  }
}
