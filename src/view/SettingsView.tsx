import { css } from '@emotion/react';
import { UnderConstruction } from '../App';
import { Drawer } from '../components/drawer/Drawer';
import { drawer } from './HouseholdBookView';

export const SettingsView = () => (
  <>
    <div css={drawer}>
      <Drawer />
    </div>
    <UnderConstruction />
  </>
);
