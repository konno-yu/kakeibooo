import { setupWorker } from 'msw';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/store';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from '@emotion/react';
import { light } from '../src/theme/theme';

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser');
  worker.start();
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  mswDecorator,
  (Story) => (
    <ThemeProvider theme={light}>
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  ),
];
