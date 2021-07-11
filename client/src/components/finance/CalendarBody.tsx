import MonthlyReceiptModel from "./model/MonthlyReceiptModel";
import CalendarBodyWeek from "./CalendarBodyWeek";

const CalendarBody: React.FC = () => {
    const mockModel = new MonthlyReceiptModel();
    return (
        <div className="root--body">
            {
                Object.values(mockModel.monthlyReceipt).map(week => {
                    return <CalendarBodyWeek value={ week }/>
                })
            }
        </div>
    )
}

export default CalendarBody;