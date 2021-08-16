import { CalendarBody } from "./CalendarBody"
import { CalendarHeader } from "./CalendarHeader"

export const Calendar: React.FC = () => {
    return (
        <div className="root--calendar">
            <CalendarHeader />
            <CalendarBody />
        </div>
    )
}

