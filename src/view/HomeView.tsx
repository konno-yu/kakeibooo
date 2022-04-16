// import styled from 'styled-components';
// import { MonthlyReport } from '../components/summary/MonthlyReport';
// import { WeeklyReport } from '../report/WeeklyReport';

import { css } from '@emotion/react';
import { UnderConstruction } from '../App';
import { Drawer } from '../components/drawer/Drawer';

// export const HomeView: React.FC = () => (
//   <S.HomeView>
//     <MonthlyReport />
//     <WeeklyReport />
//   </S.HomeView>
// );

// const S = {
//   HomeView: styled.div`
//     height: calc(100vh - 24px);
//     padding: 12px;
//     display: flex;
//     justify-content: space-between;
//   `,
// };

export const HomeView = () => (
  <>
    <div css={drawer}>
      <Drawer />
    </div>
    <UnderConstruction />
  </>
);

// TODO 多重
const drawer = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 100vh;
  width: 15%;
  border-right: 1px solid #eeeeee;
`;
