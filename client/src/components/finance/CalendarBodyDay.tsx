import { Button } from "@material-ui/core";
import { useContext } from "react";
import { financeContext } from "./FinanceContext";
import { getDate, setDate, set, getYear, getMonth, isEqual } from 'date-fns';

interface CalendarBodyDayProps {
    children?: number;
    value?: number;
}

const CalendarBodyDay: React.FC<CalendarBodyDayProps> = (props) => {
    const context = useContext(financeContext);
    const today = new Date();
    const getClassNameFromCost = (cost: number) => {
        let className = 'day';
        if (cost > 2500) {
            className += ' high';
        }
        if (cost < 1000) {
            className += ' low';
        }
        if (props.children === getDate(context.targetDate)) {
            className += ' selected';
        }
        return className;
    }

    const onClickDay = () => {
        context.setTargetDate(setDate(context.targetDate, props.children));
    }

    const isToday = () => {
        if (!props.children) {
            return false;
        }
        const displayDate = set(new Date(), { year: getYear(context.targetDate), month: getMonth(context.targetDate), date: props.children });
        return isEqual(displayDate, today);
    }

    const className: string = getClassNameFromCost(props.value);
    return (
        <Button className={className} disabled={!props.value} onClick={onClickDay}>
            <div style={{ height: '100%', width:"100%" }}>
                <div className="label">
                    {props.children}
                    {
                        isToday() && <div className="label--today">Today</div>
                    }
                </div>
                <div className="value">{props.value && `¥${props.value.toLocaleString()}`}</div>
            </div>
        </Button>
    )
}


export default CalendarBodyDay;