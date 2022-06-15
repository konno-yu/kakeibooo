import { css, Theme, useTheme } from '@emotion/react';
import { AiFillAccountBook } from 'react-icons/ai';
import { FaRegLightbulb } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiFridgeFill } from 'react-icons/ri';
import { TiHome } from 'react-icons/ti';
import { GoSignOut } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Account } from './account/Account';
import { AppTitle } from './app_title/AppTitle';
import { Menu } from './menu/Menu';
import { MenuItem } from './menu/MenuItem';
import { signOut } from '../../reducer/authSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { appAction, Tabs } from '../../reducer/appSlice';
import { Button } from '../common/button/Button';

export const Drawer = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // TODO ここの値はReduxで管理する
  const selectedTab = useAppSelector((state) => state.app.selectedTab);
  const handleChange = (nowSelected: string) => {
    dispatch(appAction.selectTab(nowSelected as Tabs));
    sessionStorage.setItem('selectedTab', nowSelected);
  };

  const logout = async () => {
    await dispatch(signOut()).then(() => {
      // ログアウト時にセッションストレージの情報を消しておく
      sessionStorage.removeItem('selectedTab');
      navigate('signin');
    });
  };

  return (
    <div css={drawerContainer}>
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: ${theme.units.px20};
        `}
      >
        <AppTitle />
        <Account username="かけい坊" userId="kakeiboy" />
        <Menu value={selectedTab} onChange={handleChange}>
          <MenuItem id="home" icon={<TiHome />}>
            {t('common.home')}
          </MenuItem>
          <MenuItem id="householdbook" icon={<AiFillAccountBook />}>
            {t('common.calendar')}
          </MenuItem>
          <MenuItem id="utility-cost" icon={<FaRegLightbulb />}>
            {t('common.pass_book')}
          </MenuItem>
          <MenuItem id="fridge" icon={<RiFridgeFill />}>
            {t('common.fridge')}
          </MenuItem>
          <MenuItem id="settings" icon={<IoSettingsSharp />}>
            {t('common.settings')}
          </MenuItem>
        </Menu>
      </div>
      <Button onClick={logout} variant="text" color="normal" icon={<GoSignOut />} label={t('common.log_out')} />
    </div>
  );
};

const drawerContainer = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 24px);
  height: calc(100% - 48px);
  gap: ${theme.units.px20};
  padding: ${theme.units.px24} ${theme.units.px12};
`;
