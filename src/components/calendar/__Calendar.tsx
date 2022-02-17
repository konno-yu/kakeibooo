import styled from "styled-components"
import { CalendarBody } from "./CalendarBody"
import { CalendarHeader } from "./CalendarHeader"

export const Calendar: React.FC = () => {
    return (
        <SC.Calendar>
            <CalendarHeader />
            <CalendarBody />
        </SC.Calendar>
    )
}

const SC = {
    Calendar: styled.div`
        width: 75%;
        height: calc(100vh - 48px);
        padding: 12px;
    `
};