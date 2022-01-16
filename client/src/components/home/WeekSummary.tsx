import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import styled from "styled-components";
import { Typography } from "../common/Typography";

export const WeekSummary: React.FC = () => {
    return (
        <Card>
            <Header>
                <HeaderTitle><AiOutlineCheckCircle />Kakeibooo</HeaderTitle>
                <GiPayMoney size={28}/>
            </Header>
            <Body>
                <BodyLabel><u>PAY THIS WEEK</u>（SHIHARAI）</BodyLabel>
                <BodyValueText>￥10,000</BodyValueText>
                <BodyLabel><u>DURATION</u></BodyLabel>
                <span>2021/11/11 - 2021/11/18</span>
            </Body>
        </Card>
    );
}

const Card = styled.div`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    border: 2px solid #ECEFF1;
    border-radius: 8px;
    background: #4DB6AC;
    width: 100%;
    font-weight: 700;
    padding: 12px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Header = styled.div`
    display: flex;
    font-size: 24px;
    justify-content: space-between;
    align-items: center;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
`

const BodyLabel = styled.span`
    color: #E0E0E0;
`

const BodyValueText = styled.div`
    font-size: 28px;    // TODO Typographyで吸収したい
`