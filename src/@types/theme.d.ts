import '@emotion/react';
import { Colors } from '../theme/theme';

declare module '@emotion/react' {
  interface Theme {
    colors: { [T in Colors]: string };
  }
}