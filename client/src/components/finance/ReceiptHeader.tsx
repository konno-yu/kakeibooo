import * as React from 'react';
import { financeContext } from './FinanceContext';
import { getYear, getMonth, getDate, getDay } from 'date-fns';
import styled from 'styled-components';

export const ReceiptHeader: React.FC = () => {
    const dayOfWeekLabel = ['日', '月', '火', '水', '木', '金', '土'];
    const getDisplayYMDD = (targetDate: Date) => {
        const zeroPadding = (val: number) => ('000' + val).slice(-2);
        return [
            getYear(targetDate),
            zeroPadding(getMonth(targetDate) + 1),
            zeroPadding(getDate(targetDate)),
            dayOfWeekLabel[getDay(targetDate)]
        ]
    }
    const context = React.useContext(financeContext);
    const [dispYear, dispMonth, dispDate, dispDay] = getDisplayYMDD(context.targetDate);

    return (
        <SC.ReceiptHeader>
            <SC.HeaderTitle>Kakeibooo</SC.HeaderTitle>
            <SC.HeaderDate>
                {dispYear}/{dispMonth}/{dispDate}（{dispDay}）
            </SC.HeaderDate>
        </SC.ReceiptHeader>
    )
}

const SC = {
    ReceiptHeader: styled.div`
        height: 10%;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 2px dashed #CFD8DC;
        text-align: center;
    `,
    HeaderTitle: styled.div`
        color: #546E7A;
        font-weight: 900;
        font-size: 24px;
    `,
    HeaderDate: styled.div`
        color: #4DB6AC;
        font-weight: 900;
        font-size: 18px;
    `
};