import { isSaturday, nextSaturday, nextSunday, subDays } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeeklyTransition } from "./WeeklyTransition";
import { MemoEditor } from "./MemoEditor";
import * as ReceiptRest from '../rest/financeRest';
import DailyReceiptModel from "../components/receipt/model/DailyReceiptModel";
import ReceiptModel from "../components/receipt/model/ReceiptModel";
import { WeeklyCostCard } from "./WeeklyCostCard";

export const WeeklyReport: React.FC = () => {
    const setInitDuration = (): { from: Date, to: Date } => {
        const today = new Date().setHours(0, 0, 0);
        const saturday = isSaturday(today) ? today : nextSaturday(today);
        const sunday = subDays(saturday, 6);
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
        setDuration((current) => { return { from: subDays(current.from, 7), to: subDays(current.to, 7) } });
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
        <S.Root>
            <WeeklyCostCard duration={duration} totalCost={getWeeklyTotalCost()} onClickPrev={prevWeek} onClickNext={nextWeek}/>
            <WeeklyTransition duration={duration} weeklyCost={weeklyReceipt} />
            <MemoEditor/>
        </S.Root>
    )
};

const S = {
    Root: styled.div`
        width: 30%;
        height: 100%;
        padding: 0 0 0 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    `,
}