import DailyReceiptModel from "./model/DailyReceiptModel";
import CalendarBodyDay from './CalendarBodyDay';

interface CalendarBodyWeekProps {
    value: [DailyReceiptModel, DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel]
}

const CalendarBodyWeek: React.FC<CalendarBodyWeekProps> = (props) => {

    return (
        <div className="week">
            {props.value.map(dailyReceipt => {
                if (dailyReceipt) {
                    return <CalendarBodyDay value={dailyReceipt.getDailyTotalCost()}>{dailyReceipt.getDate()}</CalendarBodyDay>
                } else {
                    return <CalendarBodyDay/>
                }
            })}
        </div>
    )
}

export default CalendarBodyWeek;