import styled from "styled-components"

interface CardProps {
    width: number;
}

export const Card: React.FC<CardProps> = (props) => {
    return (
        <S.CardContainer width={props.width}>
            {props.children}
        </S.CardContainer>
    )
}

const S = {
    CardContainer: styled.div<{width: number}>`
        ${( {width} ) => `width: ${width}%;`}
        height: 200px;
        background: #FFFFFF;
        border-radius: 8px;
        padding: 12px;
    `
}