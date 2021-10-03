import { LinearProgress } from "@material-ui/core"
import { AiOutlineShoppingCart } from "react-icons/ai"
import styled from "styled-components"

interface CardProps {
    title: string;
}

export const Card: React.FC<CardProps> = (props) => {
    return (
        <S.CardContainer>
            <S.CardHeader>
                <S.AccountCircle><AiOutlineShoppingCart color="#FFFFFF" size={24} /></S.AccountCircle>
                <span style={{paddingLeft: 8, color: "#80CBC4", fontWeight: 700, fontSize: 18}}>{props.title}</span>
            </S.CardHeader>
            <S.CardBody>
                <span style={{color: "#333333", fontWeight: 800, fontSize: 36}}>¥20,000</span>
            </S.CardBody>
            <S.CardFooter>
                <span style={{color: "#333333", fontWeight: 700, fontSize: 12}}>¥0</span>
                <S.StyledProgress value={50} variant="determinate" />
                <span style={{color: "#333333", fontWeight: 700, fontSize: 12}}>¥40,000</span>
            </S.CardFooter>
        </S.CardContainer>
    )
}

const S = {
    StyledProgress: styled(LinearProgress)`
        width: 75%;
        height: 30%;
        border-radius: 16px;
        &.MuiLinearProgress-root {
            background: #e0f2f1;
        }
        .MuiLinearProgress-bar {
            background: #80CBC4;
        }
    `,
    CardContainer: styled.div`
        width: 40%;
        height: 150px;
        background: #FFFFFF;
        border-radius: 8px;
        padding: 12px;
    `,
    CardHeader: styled.div`
        height: 30%;
        display: flex;
        align-items: center;
        padding: 0 4px;
    `,
    AccountCircle: styled.div`
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #80CBC4;
    `,
    CardBody: styled.div`
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    CardFooter: styled.div`
        height: 30%;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `
}