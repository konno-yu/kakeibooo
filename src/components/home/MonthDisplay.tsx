import { FaCalendar } from "react-icons/fa"
import styled from "styled-components"
import { Indicator } from "../common/Indicator"
import { MonthSelector } from "../common/MonthSelector"
import { Typography } from "../common/Typography"
import { Card } from "./Card"
import { MonthTransition } from "./MonthTransition"

interface Props {
    targetDate: Date,
    datas: { date: Date, totalCost: number }[]
}
export const MonthDisplay: React.FC<Props> = ({
    targetDate,
    datas
}) => {
    return (
        <Container>
            <MonthSelector targetDate={targetDate} />
            <MonthTransition datas={datas} />
            <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                <Card title="今月の食費" icon={<FaCalendar color="#FFFFFF" />} color="#546E7A">
                    <div style={{display: 'flex', flexDirection:"column", alignItems: 'center'}}>
                        <Typography type="header" variant="normal">¥1,200</Typography>
                        <Typography type="subHeader" variant="helper">（1日あたり ¥900）</Typography>
                    </div>
                    <Indicator range={[0, 15]} value={{ "#FF5252": 2, "#546E7A": 2, "#009688": 5 }} showLabel unit={{type:'suffix', name:"日"}} />
                </Card>
                <Card title="今月の食費" icon={<FaCalendar color="#FFFFFF" />} color="#546E7A">
                    <div style={{display: 'flex', flexDirection:"column", alignItems: 'center'}}>
                        <Typography type="header" variant="normal">¥1,200</Typography>
                        <Typography type="subHeader" variant="helper">（1日あたり ¥900）</Typography>
                    </div>
                    <Indicator range={[0, 15]} value={{ "#FF5252": 2, "#546E7A": 2, "#009688": 5 }} showLabel unit={{type:'suffix', name:"日"}} />
                </Card>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`