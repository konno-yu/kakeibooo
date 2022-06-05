import { css } from '@emotion/react';
import { UnderConstruction } from '../App';
import { Drawer } from '../components/drawer/Drawer';
import { drawer } from './HouseholdBookView';
// import { useAppDispatch, useAppSelector } from '../store';

export const FridgeView = () => (
  <>
    <div css={drawer}>
      <Drawer />
    </div>
    <UnderConstruction />
  </>
);
