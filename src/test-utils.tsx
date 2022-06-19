import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { light } from './theme/theme';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
