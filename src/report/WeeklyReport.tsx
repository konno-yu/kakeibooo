import { getYear, isEqual, isSaturday, nextSaturday, nextSunday, subDays } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeeklyTransition } from "./WeeklyTransition";
import { MemoEditor } from "./MemoEditor";
import * as ReceiptRest from '../rest/financeRest';
import DailyReceiptModel from "../components/receipt/model/DailyReceiptModel";
import ReceiptModel from "../components/receipt/model/ReceiptModel";
import { WeeklySummary } from "./WeeklySummary";
import * as MemoRest from '../rest/memoRest';
import { useAppDispatch, useAppSelector } from "../store";
import { updateMemo } from "../reducer/homeSlice";
import { Button } from "@material-ui/core";
import { FaSave, FaTrash } from "react-icons/fa";

export const WeeklyReport: React.FC = () => {
    const setInitDuration = (): { from: Date, to: Date } => {
        const today = new Date().setHours(0, 0, 0);
        const saturday = isSaturday(today) ? today : nextSaturday(today);
        const sunday = subDays(saturday, 6);
        return { from: sunday, to: new Date(saturday) };
    }
    const [duration, setDuration] = useState<{ from: Date, to: Date }>(setInitDuration());
    const [weeklyReceipt, setWeeklyReceipt] = useState<DailyReceiptModel[]>([]);
    const memo = useAppSelector(state => state.home.memo);
    const [memoText, setMemoText] = useState<string>('');
    const dispatch = useAppDispatch();

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
            const res = await MemoRest.getByYear(getYear(duration.from));
            const mm: { from: Date, to: Date, text: string }[] = [];
            res.data.forEach(d => {
                mm.push({ from: new Date(d.fromDate), to: new Date(d.toDate), text: d.memoText });
            });
            dispatch(updateMemo(mm));
            const target = mm.find(m => {
                // TODO ここの判定イケてない
                return m.from.getDate() === duration.from.getDate() &&
                m.from.getMonth() === duration.from.getMonth()
            });
            setMemoText(target === undefined ? '' : target.text);
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
        if (memo.filter(m => (m.from.getMonth() === duration.from.getMonth()) && (m.from.getDate() === duration.from.getDate())).length === 0) {
            MemoRest.post({ fromDate: duration.from, toDate: duration.to, memoText }).then(res => {
                const m = memo.push({ from: res.fromDate, to: res.toDate, text: res.memoText});
                dispatch(updateMemo(m));
            });
        } else {
            MemoRest.update({ fromDate: duration.from, toDate: duration.to, memoText }).then(res => {
                const m = memo.map(m => m.from === res.fromDate ? m.text = res.memoText : m);
                dispatch(updateMemo(m));
            });
        }
    }

    const onDeleteMemo = () => {
        MemoRest.deleteMemo(duration.from).then(res => {
            if (res.status === 200) {
                const m = memo.filter(m => m.from === duration.from);
                dispatch(updateMemo(m));
            }
        })
    }

    const setMemo = (text: string) => {
        setMemoText(() => text);
    }

    const trimHtmlString = (text: string) => {
        const str = /<\/?p>|<br>/g;
        const trimmedText = text.replace(str, '');
        return trimmedText;
    }

    return (
        <S.Root>
            <WeeklySummary duration={duration} totalCost={getWeeklyTotalCost()} onClickPrev={prevWeek} onClickNext={nextWeek}/>
            <WeeklyTransition duration={duration} weeklyCost={weeklyReceipt} />
            <MemoEditor memoText={memoText} onChange={setMemo} onSave={onSaveMemo} />
            <S.Buttons>
                <S.SaveButton onClick={onSaveMemo} disabled={trimHtmlString(memoText).length === 0}>
                    <S.SaveIcon/>保存
                </S.SaveButton>
                <S.DeleteButton onClick={onDeleteMemo} disabled={memo.filter(m => (m.from.getMonth() === duration.from.getMonth()) && (m.from.getDate() === duration.from.getDate())).length === 0}>
                    <S.DeleteIcon/>削除
                </S.DeleteButton>
            </S.Buttons>
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
    SaveButton: styled(Button)`
        width: 25%;
        background: #546E7A;
        color: #FFFFFF;
        border-radius: 100px;
        margin-top: 4px;
        font-weight: 700;
        align-self: flex-end;
        &:hover {
            background: '#546E7A';
            opacity: 0.7;
        }
    `,
    DeleteButton: styled(Button)`
    width: 25%;
    background: #FFFFFF;
    border: 1px solid #546E7A;
    color: #546E7A;
    border-radius: 100px;
    margin-top: 4px;
    font-weight: 700;
    align-self: flex-end;
    &:hover {
        background: '#546E7A';
        opacity: 0.7;
    }
    `,
    SaveIcon: styled(FaSave)`
        margin-right: 8px;
    `,
    DeleteIcon: styled(FaTrash)`
        margin-right: 8px;
    `,
    Buttons: styled.div`
        display: flex;
        justify-content: end;
        gap: 4px;
    `
}