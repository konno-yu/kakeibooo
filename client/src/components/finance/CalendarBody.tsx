import CalendarBodyWeek from "./CalendarBodyWeek";
import { useContext } from "react";
import { financeContext } from "./FinanceContext";

const CalendarBody: React.FC = () => {
    const context = useContext(financeContext);
    return (
        <div className="root--body">
            {
                Object.values((context.monthlyReceipt).monthlyReceipt).map(week => {
                    return <CalendarBodyWeek value={ week }/>
                })
            }
        </div>
    )
}

export default CalendarBody;