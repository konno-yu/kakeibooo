import styled from "styled-components";
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, CoreChartOptions } from 'chart.js';
import MonthlyReceiptModel from "../receipt/model/MonthlyReceiptModel";
import DailyReceiptModel from "../receipt/model/DailyReceiptModel";
import { getDate, getMonth } from "date-fns";
import { _DeepPartialObject } from "chart.js/types/utils";
import { chartOptions } from "./ChartOptions";

interface Props {
    receipts: DailyReceiptModel[];
}
export const MonthlyTransitionCard: React.FC<Props> = (props) => {

    /**
     * 日次での残金を計算して返す
     * @param receipt 現在閲覧中の月の日ごとの食費
     * @returns [1日時点の残金, 2日時点の残金, ..., 31日時点の残金]
     */
    const calculateBalance = (receipts: DailyReceiptModel[]) => {
        const monthlyBudget = 40000;    // TODO のちのちDBから値を取得させる
        const balance: number[] = [];
        receipts.reduce((accumulator: number, current: DailyReceiptModel) => {
            balance.push(monthlyBudget - accumulator);
            return accumulator + current.getDailyTotalCost();
        }, 0);
        return balance;

    }

    const createGraphData = (): ChartData => {
        const labels = props.receipts.map(r => `${String(getMonth(r.date) + 1).padStart(2, '0')}/${String(getDate(r.date)).padStart(2, '0')}`);
        const data = props.receipts.map(r => r.getDailyTotalCost());
        const color = props.receipts.map(r => {
            const dailyTotalCost = r.getDailyTotalCost();
            if (dailyTotalCost === 0) return "#FFF176";
            if (dailyTotalCost > 0 && dailyTotalCost <= 1000) return '#4db6ac';
            if (dailyTotalCost > 1000 && dailyTotalCost <= 2500) return "#e0e0e0";
            if (dailyTotalCost > 2500) return "#E57373";
        });
        const rest = calculateBalance(props.receipts);

        return {
            labels,
            datasets: [{
                label: "食費",
                data,
                borderColor: color,
                backgroundColor: color,
                borderWidth: 1,
                yAxisID: "cost",
                order: 2
            }, {
                label: "残金",
                data: rest,
                type: "line",
                yAxisID: "rest",
                borderColor: '#546E7A',
                backgroundColor: '#546E7A',
                order: 1
            }],
        }
    };

    return (
        <S.Card>
            <Bar data={createGraphData} options={chartOptions} height={110}/>
        </S.Card>
    );
}

const S = {
    Card: styled.div`
        width: calc(100% - 36px);
        height: 300;
        background: #FFFFFF;
        padding: 12px;
        border-radius: 8px;
    `
}