import { css } from '@emotion/react';
import * as React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import { RootRoute } from './routes/RootRoute';
// eslint-disable-next-line import/no-unresolved
import { AuthListener } from './services/authListener';
import { store } from './store';
import { HouseholdBookView } from './view/HouseholdBookView';
import { LoginView } from './view/LoginView';

export const App: React.FC = () => (
  <Provider store={store}>
    <AuthListener>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/signin" element={<LoginView />} />
          <Route
            path="/householdbook"
            element={
              <PrivateRoute>
                <HouseholdBookView />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthListener>
  </Provider>
);

// TODO 暫定
const NotFound = () => (
  <div css={notFound}>
    <h1>404</h1>
    <h3>お探しのページは見つかりませんでした。</h3>
  </div>
);

const UnderConstruction = () => (
  <div css={notFound}>
    <RiEmotionSadLine color="#009688" size={48} />
    <h3>鋭意製作中です</h3>
  </div>
);

const notFound = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
