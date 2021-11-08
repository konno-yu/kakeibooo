import { isSaturday, nextSaturday, nextSunday, sub } from "date-fns";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import { GiPayMoney } from 'react-icons/gi';
import { WeeklyCosting } from "./WeeklyCosting";
import { MemoEditor } from "./MemoEditor";
import * as ReceiptRest from '../rest/financeRest';
import DailyReceiptModel from "../components/receipt/model/DailyReceiptModel";
import ReceiptModel from "../components/receipt/model/ReceiptModel";

export const WeeklyReport: React.FC = () => {
    const setInitDuration = (): { from: Date, to: Date } => {
        const today = new Date().setHours(0, 0, 0);
        const saturday = isSaturday(today) ? today : nextSaturday(today);
        const sunday = sub(saturday, { days: 6 });
        return { from: sunday, to: new Date(saturday) };
    }
    const [duration, setDuration] = useState<{ from: Date, to: Date }>(setInitDuration());
    const [weeklyReceipt, setWeeklyReceipt] = useState<DailyReceiptModel[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await ReceiptRest.getByDuration(duration.from, duration.to);
            const wr: DailyReceiptModel[] = [];
            res.data.forEach(r => {
                const rr = r.dailyCost.map(d => new ReceiptModel(d.storeName, d.cost));
                wr.push(new DailyReceiptModel(r.purchaseDate, rr));
            });
            setWeeklyReceipt(() => wr);
        }
        fetch();
    }, [duration])

    const prevWeek = () => {
        setDuration((current) => { return { from: sub(current.from, { days: 7 }), to: sub(current.to, { days: 7 }) } });
    };

    const nextWeek = () => {
        setDuration((current) => { return { from: nextSunday(current.from), to: nextSaturday(current.to) }});
    }

    const getWeeklyTotalCost = () => {
        return weeklyReceipt.reduce((accumulator: number, current: DailyReceiptModel) => {
            return accumulator + current.getDailyTotalCost();
        }, 0);
    }

    return (
        <S.ReportRoot>
            <S.CardRoot>
                <Button onClick={prevWeek} style={{minWidth: 40, height: 48, alignSelf: "center"}}><TiChevronLeft size={28} color="#546e7a"/></Button>
                <S.Card>
                    <S.CardHeader>
                        <div>
                            <AiOutlineCheckCircle />
                            <span style={{fontSize: 20, paddingLeft: 2}}>Kakeiboooo</span>
                        </div>
                        <div style={{paddingRight: 12}}><GiPayMoney size={28}/></div>
                    </S.CardHeader>
                    <S.CardBody>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span style={{ fontSize: 12, fontWeight: 500, color: "#BDBDBD" }}><u>出費</u></span>
                            <span style={{ fontSize: 28, fontWeight: 700, paddingLeft: 4 }}>¥{getWeeklyTotalCost().toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 12, fontWeight: 500, color: "#BDBDBD" }}><u>期間</u></span>
                            <span style={{ paddingLeft: 4, fontSize: 16}}>{duration.from.toLocaleDateString()} - {duration.to.toLocaleDateString()}</span>
                        </div>
                    </S.CardBody>
                </S.Card>
                <Button onClick={nextWeek} style={{ minWidth: 40, height: 48, alignSelf: "center" }}><TiChevronRight size={28} color="#546e7a" /></Button>
            </S.CardRoot>
            <WeeklyCosting duration={duration} cost={weeklyReceipt} />
            <MemoEditor/>
        </S.ReportRoot>
    )
};

const S = {
    ReportRoot: styled.div`
        width: 30%;
        height: 100%;
        padding: 0 0 0 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    `,
    CardRoot: styled.div`
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        height: 25%;
        width: 100%;
    `,
    Card: styled.div`
        background: #546e7a;
        width: 100%;
        border-radius: 8px;
        padding: 12px;
        color: #FFFFFF;
        font-weight: 700;
    `,
    CardHeader: styled.div`
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* font-family: 'Bungee Hairline', cursive; */
    `,
    CardBody: styled.div`
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        /* font-family: 'Bungee Hairline', cursive; */
    `
}