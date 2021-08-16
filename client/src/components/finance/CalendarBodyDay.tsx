import { Button } from "@material-ui/core";
import { useContext } from "react";
import { financeContext } from "./FinanceContext";
import { getDate, setDate, set, getYear, getMonth, isEqual } from 'date-fns';
import { BsTrophy } from "react-icons/bs";

interface CalendarBodyDayProps {
    children?: number;
    value: number | null;
}

export const CalendarBodyDay: React.FC<CalendarBodyDayProps> = (props) => {
    const context = useContext(financeContext);
    const today = new Date();

    const getClassNameFromCost = (cost: number) => {
        let className = 'day';
        if (cost === 0) {
            className += ' no-money';
        }
        if (cost > 2500) {
            className += ' high';
        }
        if (cost > 0 && cost < 1000) {
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

    const getDisplayCost = (cost: number) => {
        return cost > 0 ? `¥${cost.toLocaleString()}` : '¥0';
    }
    return (
        <Button className={className} disabled={!props.children} onClick={onClickDay}>
            <div style={{ height: '100%', width:"100%" }}>
                <div className="label">
                    {props.children}
                    {
                        isToday() && <div className="label--today">Today</div>
                    }
                </div>
                {
                    props.value !== null && <div className="value">{getDisplayCost(props.value)}</div>
                }
            </div>
        </Button>
    )
}


