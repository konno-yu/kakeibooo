import styled from 'styled-components';
import { Summary } from '../components/summary/summary';

export const HomeView: React.FC = () => {
    return (
        <S.HomeView>
            <Summary/>
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