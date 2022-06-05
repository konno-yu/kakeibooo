import { UnderConstruction } from '../App';
import { Drawer } from '../components/drawer/Drawer';
import { drawer } from './HouseholdBookView';

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
