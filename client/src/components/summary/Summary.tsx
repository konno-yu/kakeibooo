import styled from 'styled-components';
import { Card } from './Card';
export const Summary: React.FC = () => {
    return (
        <S.Summary>
            <div style={{ height: "40%", width: "100%", display: "flex", justifyContent:"space-around"}}>
                <Card title="今月の食費" />
                <Card title="登録日数" />
            </div>
        </S.Summary>
    )
}

const S = {
    Summary: styled.div`
        width: 70%;
        height: calc(100vh - 48px);
        padding: 12px;
        border-right: 1px solid #BDBDBD;
        display: flex;
    `
}