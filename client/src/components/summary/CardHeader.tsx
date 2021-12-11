import styled from "styled-components"

interface Props {
    title: string;
    icon: any;
    color: string;
}
export const CardHeader: React.FC<Props> = (props) => {
    return (
        <S.CardHeader>
            <S.HeaderIcon color={props.color}>{props.icon}</S.HeaderIcon>
            <S.HeaderTitle color={props.color}>{props.title}</S.HeaderTitle>
        </S.CardHeader>
    );
}

const S = {
    CardHeader: styled.div`
        height: 30%;
        display: flex;
        align-items: center;
        padding: 0 4px;
    `,
    HeaderIcon: styled.div<{ color: string }>`
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${({color}) => `background: ${color}`};
    `,
    HeaderTitle: styled.div`
        padding-left: 8px;
        font-weight: 800;
        font-size: 22px;
        ${({color}) => `color: ${color}`};
    `
}