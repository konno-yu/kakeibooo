import * as React from 'react';
import Receipt from '../components/finance/Receipt';
import '../style/finance.scss';

const CalendarView: React.FC = () => {
    return (
        <div id="root--finance">
            <Receipt />
        </div>
    )
}

export default CalendarView;