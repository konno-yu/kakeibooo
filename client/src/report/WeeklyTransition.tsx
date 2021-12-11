import { eachDayOfInterval } from "date-fns"
import styled from "styled-components"
import DailyReceiptModel from "../components/receipt/model/DailyReceiptModel";

interface Props {
    duration: { from: Date, to: Date },
    weeklyCost: DailyReceiptModel[]
};

export const WeeklyTransition: React.FC<Props> = (props) => {
    const targetDays = eachDayOfInterval({ start: props.duration.from, end: props.duration.to });
    const label = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getColor = (dailyReceipt: DailyReceiptModel | undefined): string => {
        if (dailyReceipt === undefined) return '#ECEFF1';
        const dailyTotalCost = dailyReceipt.getDailyTotalCost();
        if (dailyTotalCost === 0) return '#FFF59D';
        if (dailyTotalCost <= 1000) return '#80CBD4';
        if (dailyTotalCost <= 2500) return '#BDBDBD';
        return '#EF9A9A';
    }

    return (
        <S.Root>
            {
                targetDays.map((day, i) => {
                    return (
                        <S.Day>
                            <S.Status>
                                <S.StatusLabel fontSize={12}>{label[i]}</S.StatusLabel>
                                <S.StatusLabel fontSize={16}>{String(day.getDate()).padStart(2, '0')}</S.StatusLabel>
                            </S.Status>
                            <S.Circle color={getColor(props.weeklyCost[i])}/>
                        </S.Day>
                    )
                })
            }
        </S.Root>
    )
}

const S = {
    Root: styled.div`
        height: 10%;
        display: flex;
        justify-content: center;
    `,
    Day: styled.div`
        display: flex;
        width: calc(100% / 7);
        justify-content: space-evenly;
        flex-direction: column;
        align-items: center;
    `,
    Status: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    StatusLabel: styled.span<{fontSize: number}>`
        color: #546E7A;
        font-weight: 700;
        ${({fontSize}) => `font-size: ${fontSize}px`};
    `,
    Circle: styled.span<{ color: string }>`
        width: 12px;
        height: 12px;
        ${({ color }) => `background: ${color}`};
        border-radius: 100px;
    `
}