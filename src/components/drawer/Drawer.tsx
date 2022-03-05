import { css } from '@emotion/react';
import { useState } from 'react';
import { AiFillAccountBook } from 'react-icons/ai';
import { FaRegLightbulb } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiFridgeFill } from 'react-icons/ri';
import { TiHome } from 'react-icons/ti';
import { Account } from './account/Account';
import { AppTitle } from './app_title/AppTitle';
import { Menu } from './menu/Menu';
import { MenuItem } from './menu/MenuItem';

export const Drawer = () => {
  const [selected, setSelected] = useState('home');
  const handleChange = (nowSelected: string) => setSelected(nowSelected);
  return (
    <div css={drawerContainer}>
      <AppTitle />
      <Account username="かけい坊" userId="kakeiboy" />
      <Menu value={selected} onChange={handleChange}>
        <MenuItem id="home" icon={<TiHome />}>
          ホーム
        </MenuItem>
        <MenuItem id="household" icon={<AiFillAccountBook />}>
          家計簿
        </MenuItem>
        <MenuItem id="utility_cost" icon={<FaRegLightbulb />}>
          光熱費
        </MenuItem>
        <MenuItem id="fridge" icon={<RiFridgeFill />}>
          冷蔵庫
        </MenuItem>
        <MenuItem id="setting" icon={<IoSettingsSharp />}>
          設定
        </MenuItem>
      </Menu>
    </div>
  );
};

const drawerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 24px);
  height: calc(100% - 48px);
  gap: 20px;
  padding: 24px 12px;
`;
