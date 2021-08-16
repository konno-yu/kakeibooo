import * as React from 'react';
import { Calendar } from '../components/finance/Calendar';
import { Receipt } from '../components/finance/Receipt';
import { financeContext, useFinance } from '../components/finance/FinanceContext';
import styled from 'styled-components';

export const FinanceView: React.FC = () => {
    const context = useFinance();
    return (
        <SC.FinanceView>
            <financeContext.Provider value={context}>
                <Calendar />
                <Receipt />
            </financeContext.Provider>
        </SC.FinanceView>
    )
}

const SC = {
    FinanceView: styled.div`
        height: calc(100vh - 24px);
        padding: 12px;
        display: flex;
        justify-content: space-between;
    `
};