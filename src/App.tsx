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
import { FridgeView } from './view/FridgeView';
import { HomeView } from './view/HomeView';
import { HouseholdBookView } from './view/HouseholdBookView';
import { LoginView } from './view/LoginView';
import { SettingsView } from './view/SettingsView';
import { UtilityCostView } from './view/UtilityCostView';

export const App: React.FC = () => (
  <Provider store={store}>
    <AuthListener>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/signin" element={<LoginView />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeView />
              </PrivateRoute>
            }
          />
          <Route
            path="/householdbook"
            element={
              <PrivateRoute>
                <HouseholdBookView />
              </PrivateRoute>
            }
          />
          <Route
            path="/utility-cost"
            element={
              <PrivateRoute>
                <UtilityCostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/fridge"
            element={
              <PrivateRoute>
                <FridgeView />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsView />
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

export const UnderConstruction = () => (
  <div css={notFound}>
    <RiEmotionSadLine color="#009688" size={48} />
    <h3>準備中</h3>
  </div>
);

const notFound = css`
  background: #eceff1;
  height: calc(100vh - 24px);
  width: calc(85% - 24px);
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
