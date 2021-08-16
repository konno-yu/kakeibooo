import * as React from 'react';
import '../style/finance.scss';
import { Calendar } from '../components/finance/Calendar';
import { Receipt } from '../components/finance/Receipt';
import { financeContext, useFinance } from '../components/finance/FinanceContext';

export const FinanceView: React.FC = () => {
    const context = useFinance();
    return (
        <div id="root--finance">
            <financeContext.Provider value={context}>
                <Calendar />
                <Receipt />
            </financeContext.Provider>
        </div>
    )
}

