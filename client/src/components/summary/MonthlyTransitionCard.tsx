import styled from "styled-components";
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import DailyReceiptModel from "../receipt/model/DailyReceiptModel";
import { getDate, getMonth } from "date-fns";
import { chartOptions } from "../../settings/chartOptions";

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

    /**
     * 月次での食費/残金の推移を返す
     * x軸のラベル、グラフ内のデータ、グラフ色を生成する
     * @returns chartjsのフォーマットにしたがう
     */
    const createGraphData = (): ChartData => {
        const labels: string[] = [];
        const data: number[] = [];
        const color: string[] = [];

        const getColor = (cost: number) => {
            if (cost === 0) return '#FFF176';
            if (cost <= 1000) return '#4db6ac';
            if (cost <= 2500) return '#E0E0E0';
            return '#E57373';
        }

        props.receipts.forEach(r => {
            const dailyTotalCost = r.getDailyTotalCost();
            labels.push(`${String(getMonth(r.date) + 1).padStart(2, '0')}/${String(getDate(r.date)).padStart(2, '0')}`);
            data.push(dailyTotalCost);
            color.push(getColor(dailyTotalCost));
        })

        const balance = calculateBalance(props.receipts);

        return {
            labels,
            datasets: [{
                label: "残金",
                data: balance,
                type: "line",
                yAxisID: "balance",
                borderColor: '#546E7A',
                backgroundColor: '#546E7A',
                order: 1
            },
            {
                label: "食費",
                data,
                borderColor: color,
                backgroundColor: color,
                borderWidth: 1,
                yAxisID: "cost",
                order: 2
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