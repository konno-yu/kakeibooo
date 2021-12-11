import styled from "styled-components";

export const CardBody: React.FC = (props) => {
    return (
        <S.CardBody>
            {props.children}
        </S.CardBody>
    );
}

const S = {
    CardBody: styled.div`
        height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `
}