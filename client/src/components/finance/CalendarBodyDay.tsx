interface CalendarBodyDayProps {
    children?: number;
    value?: number;
}

const CalendarBodyDay: React.FC<CalendarBodyDayProps> = (props) => {
    const getClassNameFromCost = (cost: number) => {
        if (cost > 2500) {
            return "day high";
        }
        if (cost < 1000) {
            return "day low";
        }
        return "day";
    }

    const className: string = getClassNameFromCost(props.value);
    return (
        <div className={className}>
            <div className="label">
                {props.children}
            </div>
            <div className="value">
                {
                    props.value && `¥${props.value.toLocaleString()}`
                }
            </div>
        </div>
    )
}

export default CalendarBodyDay;