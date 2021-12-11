import { Button } from "@material-ui/core";
import { getYear } from "date-fns";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { showPrevMonth, showNextMonth, updateMonthlyReceipt } from "../../reducer/householdBookSlice";
import { useAppSelector } from "../../store";
import MonthlyReceiptModel from '../receipt/model/MonthlyReceiptModel';

export const SummaryHeader: React.FC = () => {
    const targetMonth = useAppSelector(state => state.householdBook.targetDate);
    const dispatch = useDispatch();

    const getPreviousMonth = () => {
        dispatch(showPrevMonth());
        const monthlyReceipt = new MonthlyReceiptModel(targetMonth, undefined);
        dispatch(updateMonthlyReceipt(monthlyReceipt));
    }

    const getNextMonth = () => {
        dispatch(showNextMonth());
        const monthlyReceipt = new MonthlyReceiptModel(targetMonth, undefined);
        dispatch(updateMonthlyReceipt(monthlyReceipt));
    }


    return (
        <S.SummaryHeader>
            <S.MonthSelector>
                <div>
                    {(targetMonth).toLocaleDateString('en-US', { month: 'long' })} {getYear(targetMonth)}
                </div>
                <div>
                    <Button onClick={getPreviousMonth}>
                        <HiArrowCircleLeft size={28} color="#546e7a"/>
                    </Button>
                    <Button onClick={getNextMonth}>
                        <HiArrowCircleRight size={28} color="#546e7a"/>
                    </Button>
                </div>
            </S.MonthSelector>
        </S.SummaryHeader>
    )
}

const S = {
    SummaryHeader: styled.div`
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: column;
    `,
    MonthSelector: styled.div`
        height: 50%;
        font-size: 24px;
        color: #546E7A;
        font-weight: 900;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
}