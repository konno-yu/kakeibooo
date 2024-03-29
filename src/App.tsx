import { css, ThemeProvider } from '@emotion/react';
import * as React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { PrivateRoute } from './routes/PrivateRoute';
import { RootRoute } from './routes/RootRoute';
import { store } from './store';
import { FridgeView } from './view/FridgeView';
import { HomeView } from './view/HomeView';
import { HouseholdBookView } from './view/HouseholdBookView';
import { LoginView } from './view/LoginView';
import { SettingsView } from './view/SettingsView';
import { UtilityCostView } from './view/UtilityCostView';
import { setSession } from './reducer/authSlice';
import { supabase } from './supabaseClient';
import { light } from './theme/theme';
import i18n from './i18n';

type Props = {
  children: React.ReactNode;
};

export const AuthListener: React.VFC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();
  const session = supabase.auth.session();

  useEffect(() => {
    if (session) {
      dispatch(setSession({ session }));
    }
  }, [dispatch, session]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const App: React.FC = () => (
  <ThemeProvider theme={light}>
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  </ThemeProvider>
);

// TODO 暫定
const NotFound = () => (
  <div css={notFound}>
    <h1>404</h1>
    <h3>お探しのページは見つかりませんでした。</h3>
  </div>
);

export const UnderConstruction = () => (
  // TODO どうせ消すのでテーマではなく固定値をあてておく
  <div css={notFound}>
    <RiEmotionSadLine color="#FB836F" size={48} />
    <h3>準備中</h3>
  </div>
);

const notFound = css`
  // TODO どうせ消すのでテーマはあてない
  background: #f6f6f6;
  height: calc(100vh - 24px);
  width: calc(85% - 24px);
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
