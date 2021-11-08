import styled from 'styled-components';
import { Summary } from '../components/summary/summary';
import { WeeklyReport } from '../report/WeeklyReport';

export const HomeView: React.FC = () => {
    return (
        <S.HomeView>
            <Summary />
            <WeeklyReport/>
        </S.HomeView>
    )
}

const S = {
    HomeView: styled.div`
        height: calc(100vh - 24px);
        padding: 12px;
        display: flex;
        justify-content: space-between;
    `
}