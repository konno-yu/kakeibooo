import { Button } from "@material-ui/core";
import { getYear } from "date-fns";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import styled from "styled-components"

export const SummaryHeader: React.FC = () => {
    const targetMonth = new Date();
    return (
        <S.SummaryHeader>
            <S.MonthSelector>
                <div>
                    {(targetMonth).toLocaleDateString('en-US', { month: 'long' })} {getYear(targetMonth)}
                </div>
                <div>
                    <Button>
                        <HiArrowCircleLeft size={28} color="#546e7a"/>
                    </Button>
                    <Button>
                        <HiArrowCircleRight size={28} color="#546e7a"/>
                    </Button>
                </div>
            </S.MonthSelector>
        </S.SummaryHeader>
    )
}

const S = {
    SummaryHeader: styled.div`
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: column;
    `,
    MonthSelector: styled.div`
        height: 50%;
        font-size: 24px;
        color: #546E7A;
        font-weight: 900;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
}