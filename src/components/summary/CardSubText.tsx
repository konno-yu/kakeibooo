import styled from "styled-components"

export const CardSubText: React.FC = (props) => {
    return (
        <S.CardSubText>{props.children}</S.CardSubText>
    )
}

const S = {
    CardSubText: styled.div`
        color: #90a4ae;
        font-weight: 700;
        font-size: 16px;
    `
}