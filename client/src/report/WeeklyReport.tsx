import { isSaturday, nextSaturday, nextSunday, subDays } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeeklyTransition } from "./WeeklyTransition";
import { MemoEditor } from "./MemoEditor";
import * as ReceiptRest from '../rest/financeRest';
import DailyReceiptModel from "../components/receipt/model/DailyReceiptModel";
import ReceiptModel from "../components/receipt/model/ReceiptModel";
import { WeeklySummary } from "./WeeklySummary";
import * as MemoRest from '../rest/memoRest';

export const WeeklyReport: React.FC = () => {
    const setInitDuration = (): { from: Date, to: Date } => {
        const today = new Date().setHours(0, 0, 0);
        const saturday = isSaturday(today) ? today : nextSaturday(today);
        const sunday = subDays(saturday, 6);
        return { from: sunday, to: new Date(saturday) };
    }
    const [duration, setDuration] = useState<{ from: Date, to: Date }>(setInitDuration());
    const [weeklyReceipt, setWeeklyReceipt] = useState<DailyReceiptModel[]>([]);
    const [memoText, setMemoText] = useState('');

    useEffect(() => {
        const fetchReceipt = async () => {
            const res = await ReceiptRest.getByDuration(duration.from, duration.to);
            const wr: DailyReceiptModel[] = [];
            res.data.forEach(r => {
                const rr = r.dailyCost.map(d => new ReceiptModel(d.storeName, d.cost));
                wr.push(new DailyReceiptModel(r.purchaseDate, rr));
            });
            setWeeklyReceipt(() => wr);
        };
        const fetchMemo = async () => {
            const res = await MemoRest.getByDuration(duration.from, duration.to);
            const mt: string = res.data[0] ? res.data[0].memoText : '';
            setMemoText(() => mt);
        };
        fetchReceipt();
        fetchMemo();
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

    const onSaveMemo = () => {
        MemoRest.post({ fromDate: duration.from, toDate: duration.to, memoText }).then(res => {
            alert("OK");
        })
    }

    const setMemo = (text: string) => setMemoText(() => text);

    return (
        <S.Root>
            <WeeklySummary duration={duration} totalCost={getWeeklyTotalCost()} onClickPrev={prevWeek} onClickNext={nextWeek}/>
            <WeeklyTransition duration={duration} weeklyCost={weeklyReceipt} />
            <MemoEditor memoText={memoText} onChange={setMemo} onSave={onSaveMemo}/>
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