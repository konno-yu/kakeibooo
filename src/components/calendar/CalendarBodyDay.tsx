import { Button } from "@material-ui/core";
import { useContext } from "react";
import { getDate, set, getYear, getMonth, isEqual } from 'date-fns';
import styled, { css } from "styled-components";
import ImgPath from '../../images/medal.svg';
import { useAppDispatch, useAppSelector } from "../../store";
import { showSpecifyDate } from "../../reducer/householdBookSlice";

interface CalendarBodyDayProps {
    children?: number;
    value: number | null;
}

export const CalendarBodyDay: React.FC<CalendarBodyDayProps> = (props) => {
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const dispatch = useAppDispatch();
    const today = new Date();

    const getDailyCost = (cost: number) => {
        if (cost === 0) return 'no';
        if (cost > 2500) return 'high';
        if (cost > 0 && cost < 1000) return 'low';
        return;
    }

    const isSelected = () => {
        return props.children === getDate(targetDate);
    }

    const onClickDay = () => {
        dispatch(showSpecifyDate(props.children));
    }

    const isToday = () => {
        if (!props.children) {
            return false;
        }
        const displayDate = set(new Date(), { year: getYear(targetDate), month: getMonth(targetDate), date: props.children });
        return isEqual(displayDate, today);
    }

    const getDisplayCost = (cost: number) => {
        return cost > 0 ? `¥${cost.toLocaleString()}` : '¥0';
    }
    return (
        <SC.CalendarBodyDay
            cost={getDailyCost(props.value)}
            disabled={!props.children}
            onClick={onClickDay}
            isSelected={isSelected()}
        >
            <SC.DayContainer>
                <SC.DayLabel>
                    {props.children}
                    {
                        isToday() && <SC.TodayLabel>Today</SC.TodayLabel>
                    }
                </SC.DayLabel>
                {
                    props.value !== null && <SC.DayValue>{getDisplayCost(props.value)}</SC.DayValue>
                }
            </SC.DayContainer>
        </SC.CalendarBodyDay>
    )
}


const SC = {
    CalendarBodyDay: styled(Button) <{ cost?: 'no' | 'high' | 'low', isSelected: boolean }>`
        .MuiButton-label {
            height: 100%;
            display: flex;
        }
        font-family: "M PLUS Rounded 1c", sans-serif;
        width: calc(100% / 7);
        padding: 4px;
        margin: 2px;
        ${props => (props.cost === 'no') ? css`
            background: #FFF9C4;
            background-image: url(${ImgPath});
            background-size: 50% auto;
            background-position: center center;
            background-repeat: no-repeat;
            &:hover {
                background: #FFF9C4;
                background-image: url(${ImgPath});
                background-size: 50% auto;
                background-position: center center;
                background-repeat: no-repeat;
                opacity: 0.7;
            }
        ` : (props.cost === 'high') ? css`
            background: #FFCDD2;
            &:hover {
                background: #FFCDD2;
                opacity: 0.7;
            }
        ` : (props.cost === 'low') ? css`
            background: #B2DFDB;
            &:hover {
                background: #B2DFDB;
                opacity: 0.7;
            }
        ` : css`
            background: #FFFFFF;
            &:hover {
                background: #FFFFFF;
                opacity: 0.7;
            }
        `};
        color: #546E7A;
        border: ${(props) => props.isSelected ? "2px dashed #546E7A" : "2px solid #ECEFF1"};
        border-radius: 8px;
        font-weight: 700;
    `,
    DayContainer: styled.div`
        width: 100%;
        height: 100%;
    `,
    DayLabel: styled.div`
        height: 20%;
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-weight: 800;
   `,
    TodayLabel: styled.div`
        color: #4DB6AC;
    `,
    DayValue: styled.div`
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 900;
    `
};