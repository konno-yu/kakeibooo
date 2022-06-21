import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { light } from './theme/theme';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={light}>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  </ThemeProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
