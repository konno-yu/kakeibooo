import { getMonth, getYear } from "date-fns";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import styled from "styled-components";
import { IconButton } from "../icon_button/IconButton";

interface Props {
    targetDate: Date;
    locale?: 'ja' | 'en'
}

export const MonthSelector: React.FC<Props> = ({
    targetDate,
    locale = 'ja'
}) => {
    const displayFormat = locale === 'ja' ? `${getYear(targetDate)}年 ${getMonth(targetDate) + 1}月` : `${(targetDate).toLocaleDateString('en-US', { month: 'long' })} ${getYear(targetDate)}`;
    return (
        <Container>
            <span>{displayFormat}</span>
            <ButtonContainer>
                <IconButton>
                    <HiArrowCircleLeft size={28} color="#546E7A" />
                </IconButton>
                <IconButton>
                    <HiArrowCircleRight size={28} color="#546E7A" />
                </IconButton>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled.div`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 24px;
    color: #546E7A;
    font-weight: 900;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
`