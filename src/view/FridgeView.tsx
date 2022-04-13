import { css } from '@emotion/react';
import { UnderConstruction } from '../App';
import { Drawer } from '../components/drawer/Drawer';
import { useAppDispatch, useAppSelector } from '../store';

export const FridgeView = () => {
  // TODO 多重
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector((state) => state.app.selectedTab);
  return (
    <>
      <div css={drawer}>
        <Drawer />
      </div>
      <UnderConstruction />
    </>
  );
};

// TODO 多重
const drawer = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 100vh;
  width: 15%;
  border-right: 1px solid #eeeeee;
`;
