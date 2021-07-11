import CalendarBody from "./CalendarBody"
import CalendarHeader from "./CalendarHeader"

const Calendar: React.FC = () => {
    return (
        <div className="root--calendar">
            <CalendarHeader />
            <CalendarBody />
        </div>
    )
}

export default Calendar;