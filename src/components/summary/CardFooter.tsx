import styled from "styled-components"

export const CardFooter: React.FC = (props) => {
    return (
        <S.CardFooter>{props.children}</S.CardFooter>
    )

}

const S = {
    CardFooter: styled.div`
        height: 30%;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `
}