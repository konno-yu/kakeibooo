import * as React from 'react';
import Calendar from '../components/finance/Calendar';
import Receipt from '../components/finance/Receipt';
import '../style/finance.scss';

const CalendarView: React.FC = () => {
    return (
        <div id="root--finance">
            <Calendar />
            <Receipt />
        </div>
    )
}

export default CalendarView;