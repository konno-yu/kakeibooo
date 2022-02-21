import styled, { css } from "styled-components";
import { FaUserEdit } from 'react-icons/fa';
import ImgPath from '../../../images/medal.svg';

interface Props {
    dayIndex: number | null;
    children?: number;
    isToday?: boolean;
    isSelected?: boolean;
    type: 'zero' | 'low' | 'normal' | 'high',
    onClick?: (dayIndex: number) => void;
}

export const DayPanel: React.FC<Props> = ({
    dayIndex,
    children,
    isToday = false,
    isSelected = false,
    type,
    onClick
}) => {
    if (dayIndex === null) {
        return <Styled.Blank />
    }

    const handleOnClick = () => {
        onClick(dayIndex);
    }

    const PanelBody: JSX.Element = (
        <>
            <DayLabel key={dayIndex}>
                {String(dayIndex).padStart(2, '0')}
                {(isToday && !isSelected) && <TodayLabel>今日</TodayLabel>}
                {isSelected && <FaUserEdit size={24}/>}
            </DayLabel>
            <DayValueText>¥{children.toLocaleString()}</DayValueText>
        </>
    );

    switch (type) {
        case 'zero': return (<Styled.Zero onClick={handleOnClick}>{PanelBody}</Styled.Zero>);
        case 'low': return (<Styled.Low onClick={handleOnClick}>{PanelBody}</Styled.Low>);
        case 'normal': return (<Styled.Normal onClick={handleOnClick}>{PanelBody}</Styled.Normal>);
        case 'high': return (<Styled.High onClick={handleOnClick}>{PanelBody}</Styled.High>);
    }
}

const baseStyle = css`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    width: calc(100% / 7);
    height: 100%;
    min-height: 80px;
    border-radius: 8px;
    color: #546E7A;
    font-weight: 700;
    display: flex;
    flex-direction: column;
`;

const Styled = {
    Blank: styled.div`
        ${baseStyle};
        background: #FFFFFF;
    `,
    Normal: styled.div`
        ${baseStyle};
        cursor: pointer;
        background: #FFFFFF;
        &:hover {
            background: #F5F5F5;
        }
        &:active {
            background: #FFFFFF;
        }
    `,
    Low: styled.div`
        ${baseStyle};
        cursor: pointer;
        background: #B2DFDB;
        &:hover {
            background: #E0F2F1;
        }
        &:active {
            background: #B2DFDB;
        }
    `,
    High: styled.div`
        ${baseStyle};
        cursor: pointer;
        background: #FFCDD2;
        &:hover {
            background: #FFEBEE;
        }
        &:active {
            background: #FFCDD2;
        }
    `,
    Zero: styled.div`
        ${baseStyle};
        cursor: pointer;
        background: #FFF9C4;
        background-image: url(${ImgPath});
        background-size: 50% auto;
        background-position: center center;
        background-repeat: no-repeat;
        &:hover {
            background: #FFFDE7;
        }
        &:active {
            background: #FFF9C4;
        }
    `
};

const DayLabel = styled.div`
    padding: 4px 8px 0 8px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
`;

const DayValueText = styled.div`
    font-size: 20px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const TodayLabel = styled.span`
    color: #4DB6AC;
`;