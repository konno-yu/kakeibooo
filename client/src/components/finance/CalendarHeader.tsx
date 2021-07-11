import { Button } from '@material-ui/core';
import * as dfns from 'date-fns';
import { getWeekOfMonthWithOptions } from 'date-fns/fp';
import { useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from './FinanceSvgIcons';
const CalendarHeader: React.FC = () => {
    const dayOfWeekLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

    const getPreviousMonth = () => {
        setDisplayMonth(dfns.setMonth(displayMonth, displayMonth.getMonth() - 1));
    }

    const getNextMonth = () => {
        setDisplayMonth(dfns.setMonth(displayMonth, displayMonth.getMonth() + 1));
    }

    return (
        <div className="root--header">
            <div className="year-and-month">
                <div>
                    {displayMonth.toLocaleDateString('en-US', { month: 'long' })} {dfns.getYear(displayMonth)}
                </div>
                <div>
                    <Button onClick={getPreviousMonth}>
                        <LeftArrowIcon width={32} height={32} color="#546e7a" />
                    </Button>
                    <Button onClick={getNextMonth}>
                        <RightArrowIcon width={32} height={32} color="#546e7a" />
                    </Button>
                </div>
            </div>
            <div className="day-of-week">
                {
                    dayOfWeekLabel.map(str => <div className="element">{str}</div>)
                }
            </div>
        </div>
    )
}

export default CalendarHeader;