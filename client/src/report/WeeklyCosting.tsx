import { eachDayOfInterval } from "date-fns"
import { FaRegGrinSquint } from "react-icons/fa";
import styled from "styled-components"
import DailyReceiptModel from "../components/receipt/model/DailyReceiptModel";

export const WeeklyCosting: React.FC<{ duration: { from: Date, to: Date }, cost: DailyReceiptModel[] }> = (props) => {
    const arr = eachDayOfInterval({ start: props.duration.from, end: props.duration.to });
    const label = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getColor = (dailyCost: DailyReceiptModel | undefined): string => {
        if (dailyCost === undefined) return '#FFFFFF';
        if (dailyCost.getDailyTotalCost() === 0) return '#FFF59D';
        if (dailyCost.getDailyTotalCost() < 1000) return '#80CBD4';
        if (dailyCost.getDailyTotalCost() > 2500) return '#EF9A9A';
        return '#BDBDBD';
    }

    return (
        <S.Sample>
            {
                arr.map((r, i) => {
                    console.log(props.cost[i]);
                    return (
                        <div style={{display: 'flex', width:`calc(100%/7)`, justifyContent: "space-evenly", flexDirection: "column", alignItems: "center"}}>
                            <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                                <span style={{ color: "#546e7a", fontWeight: 700, fontSize: 12 }}>{label[i]}</span>
                                <span style={{ color: "#546e7a", fontWeight: 700, fontSize: 16 }}>{('0' + r.getDate()).slice(-2)}</span>
                            </div>
                            <S.Circle color={getColor(props.cost[i])}/>
                            {/* <span style={{ width: 12, height: 12, background: "#EF9A9A", borderRadius: 100 }}/> */}
                        </div>
                    )
                })
            }
        </S.Sample>
    )
}

const S = {
    Sample: styled.div`
        height: 10%;
        display: flex;
        justify-content: center;
    `,
    Circle: styled.span<{ color: string }>`
        width: 12px;
        height: 12px;
        ${({ color }) => `background: ${color}`};
        border-radius: 100px;
    `
}