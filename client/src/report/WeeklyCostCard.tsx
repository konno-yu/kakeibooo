import { Button } from "@material-ui/core"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { GiPayMoney } from "react-icons/gi"
import { TiChevronLeft, TiChevronRight } from "react-icons/ti"
import styled from "styled-components"

interface Props {
    duration: { from: Date, to: Date };
    totalCost: number;
    onClickPrev: () => void;
    onClickNext: () => void;
}

export const WeeklyCostCard: React.FC<Props> = (props) => {
    return (
        <S.Root>
            <S.ChevronButton onClick={props.onClickPrev}>
                <TiChevronLeft size={28} color='#546E7A'/>
            </S.ChevronButton>
            <S.Card>
                <S.CardHeader>
                    <div>
                        <AiOutlineCheckCircle />
                        <S.CardHeaderTitle>Kakeibooo</S.CardHeaderTitle>
                    </div>
                    <S.CardHeaderIcon><GiPayMoney size={28}/></S.CardHeaderIcon>
                </S.CardHeader>
                <S.CardBody>
                    <S.CardBodyContent>
                        <S.CardBodyLabel><u>出費</u></S.CardBodyLabel>
                        <S.CostText>¥{props.totalCost.toLocaleString()}</S.CostText>
                    </S.CardBodyContent>
                    <S.CardBodyContent>
                        <S.CardBodyLabel><u>期間</u></S.CardBodyLabel>
                        <S.DurationText>{props.duration.from.toLocaleDateString()} - {props.duration.to.toLocaleDateString()}</S.DurationText>
                    </S.CardBodyContent>
                </S.CardBody>
            </S.Card>
            <S.ChevronButton onClick={props.onClickNext}>
                <TiChevronRight size={28} color='#546E7A'/>
            </S.ChevronButton>
        </S.Root>
    )
}

const S = {
    Root: styled.div`
        height: 25%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    Card: styled.div`
        background: #546E7A;
        width: 100%;
        border-radius: 8px;
        padding: 12px;
        color: #FFFFFF;
        font-weight: 700;
    `,
    CardHeader: styled.div`
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    CardHeaderTitle: styled.span`
        font-size: 20px;
        padding-left: 2px;
    `,
    CardHeaderIcon: styled.div`
        padding-right: 12px;
    `,
    CardBody: styled.div`
        height: 80%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    `,
    CardBodyContent: styled.div`
        display: flex;
        flex-direction: column;
    `,
    CardBodyLabel: styled.span`
        font-size: 12px;
        font-weight: 500;
        color: #BDBDBD;
    `,
    CostText: styled.span`
        font-size: 28px;
        font-weight: 700;
        padding-left: 4px;
    `,
    DurationText: styled.span`
        font-size: 16px;
        padding-left: 4px
    `,
    ChevronButton: styled(Button)`
        min-width: 40px;
        height: 48px;
        align-self: center;
    `
}