import { AiOutlineShoppingCart, AiOutlineCalendar } from 'react-icons/ai';
import { FaRegFrownOpen, FaRegGrinSquint, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import styled from 'styled-components';
import { Indicator } from '../common/Indicator';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardSubText } from './CardSubText';
import { CardText } from './CardText';
import { SummaryHeader } from './SummaryHeader';
import { useAppDispatch, useAppSelector } from '../../store';
import React, { ReactElement, useEffect } from 'react';
import * as FinanceRest from '../../rest/financeRest';
import { getMonth, getYear } from 'date-fns';
import { updateMonthlyReceipt } from '../../reducer/householdBookSlice';
import MonthlyReceiptModel from '../receipt/model/MonthlyReceiptModel';
import { MonthlyTransitionCard } from './MonthlyTransitionCard';
import { IconType } from 'react-icons';

const COLOR_AND_ICONS: { [key in 'zero' | 'low' | 'normal' | 'high']: {color: string, icon: ReactElement} } = {
    zero: { color: '#FFF59D', icon: <FaRegGrinSquint size={20}/> },
    low: { color: '#80CBC4', icon: <FaRegSmile size={20} /> },
    normal: { color: '#E0E0E0', icon: <FaRegMeh size={20}/> },
    high: { color: '#EF9A9A', icon: <FaRegFrownOpen size={20}/> }
};

export const Summary: React.FC = () => {
    const monthlyReceipt = useAppSelector(state => state.householdBook.monthlyReceipt);
    const dispatch = useAppDispatch();
    const m = useAppSelector(state => state.householdBook.targetDate);

    useEffect(() => {
        const fetch = async () => {
            const res = await FinanceRest.getByMonth(getYear(m), getMonth(m));
            dispatch(updateMonthlyReceipt(new MonthlyReceiptModel(m, undefined, res.data)));
        }
        fetch();
    }, [m]);

    const monthlyTotalCost = monthlyReceipt.getMonthlyTotalCost();
    const monthlyAverageCost = monthlyReceipt.getMonthlyAverageCost();
    const consumptionDegrees = monthlyReceipt.getConsumptionDegrees();

    return (
        <S.Summary>
            <SummaryHeader/>
            <S.MonthlyReport>
                <Card width={45}>
                    <CardHeader title="今月の食費" icon={<AiOutlineShoppingCart color="#FFF" size={24} />} color="#546E7A" />
                    <CardBody>
                        <CardText unit={{ type: "prefix", name: "¥" }}>{monthlyTotalCost.toLocaleString()}</CardText>
                        <CardSubText>{`（１日あたり ¥${monthlyAverageCost.toLocaleString()}）`}</CardSubText>
                    </CardBody>
                    <CardFooter>
                        <Indicator range={[0, 40000]} value={[monthlyTotalCost]} color={["#546E7A"]} withLabel />
                    </CardFooter>
                </Card>
                <Card width={45}>
                    <CardHeader title="今月の内訳" icon={<AiOutlineCalendar color="#FFF" size={24} />} color="#546E7A" />
                    <CardBody>
                        <S.BreakdownContainer>
                            {
                                Object.keys(consumptionDegrees).map((d: 'zero' | 'low' | 'normal' | 'high') => {
                                    return (
                                        <S.BreakdownCard color={COLOR_AND_ICONS[d].color}>
                                            {COLOR_AND_ICONS[d].icon}
                                            <S.BreakdownCardText>
                                                {consumptionDegrees[d]}<S.BreakdownCardUnit>日</S.BreakdownCardUnit>
                                            </S.BreakdownCardText>
                                        </S.BreakdownCard>

                                    )
                                })
                            }
                        </S.BreakdownContainer>
                    </CardBody>
                    <CardFooter>
                        <Indicator range={[0, monthlyReceipt.getLastDateOfMonth(m)]} value={Object.values(consumptionDegrees)} color={["#fff176", "#4db6ac", "#e0e0e0", "#e57373"]} withLabel />
                    </CardFooter>
                </Card>
            </S.MonthlyReport>
            <S.MonthlyTransition>
                <MonthlyTransitionCard receipt={monthlyReceipt.getFlattenMonthlyReceipt()} />
            </S.MonthlyTransition>
        </S.Summary>
    )
}

const S = {
    Summary: styled.div`
        width: 70%;
        height: calc(100vh - 48px);
        padding: 12px;
        border-right: 1px solid #BDBDBD;
        display: flex;
        flex-direction: column;
    `,
    MonthlyReport: styled.div`
        height: 40%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        flex-wrap: wrap;
        gap: 10px 0;
    `,
    MonthlyTransition: styled.div`
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    BreakdownContainer: styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    `,
    BreakdownCard: styled.div<{ color: string }>`
        ${({color}) => `color: ${color}`};
        width: 20%;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background: #546E7A;
        padding: 4px 4px 0 4px;
    `,
    BreakdownCardText: styled.div`
        font-size: 16pt;
        font-weight: 700;
    `,
    BreakdownCardUnit: styled.span`
        font-size: 10pt;
    `
}