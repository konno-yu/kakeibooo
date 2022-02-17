import styled from "styled-components";

const DAY_OF_WEEK_LABEL = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const Header: React.VFC = () => {
    return (
        <StyledHeader>
            { DAY_OF_WEEK_LABEL.map(elm => <HeaderElement>{elm}</HeaderElement>) }
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    display: flex;
    align-items: flex-end;
`;

const HeaderElement = styled.div`
    width: calc(100% / 7);
    padding-bottom: 2px;
    font-size: 14px;
    font-weight: 800;
    color: #546E7A;
    border-bottom: 1.5px solid #546E7A;
`