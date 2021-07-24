import * as React from 'react';
import Calendar from '../components/finance/Calendar';
import Receipt from '../components/finance/Receipt';
import '../style/finance.scss';
import { financeContext, useFinance } from '../components/finance/FinanceContext';

const CalendarView: React.FC = () => {
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

export default CalendarView;