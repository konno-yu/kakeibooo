import styled, { css } from "styled-components"

interface Props {
    dayIndex: number | null;
    children?: number;
    isToday: boolean;
    isSelected: boolean;
    type: 'zero' | 'low' | 'normal' | 'high'
}

export const DayPanel: React.FC<Props> = ({
    dayIndex = 1,
    children = 1000,
    isToday = false,
    isSelected = false,
    type = 'low'
}) => {
    if (dayIndex === null) {
        return <Styled.Blank />
    }

    const PanelBody: JSX.Element = (
        <>
            <DayLabel>
                {String(dayIndex).padStart(2, '0')}
                {isToday && <TodayLabel>TODAY</TodayLabel>}
            </DayLabel>
            <DayValueText>¥{children.toLocaleString()}</DayValueText>
        </>
    );

    switch (type) {
        case 'zero': return (<Styled.Zero isSelected={isSelected}>{PanelBody}</Styled.Zero>);
        case 'low': return (<Styled.Low isSelected={isSelected}>{PanelBody}</Styled.Low>);
        case 'normal': return (<Styled.Normal isSelected={isSelected}>{PanelBody}</Styled.Normal>);
        case 'high': return (<Styled.High isSelected={isSelected}>{PanelBody}</Styled.High>);
    }
}

const baseStyle = css`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    width: 120px;
    height: 80px;
    border-radius: 8px;
    padding: 4px;
    color: #546E7A;
    font-weight: 700;
`;

const Styled = {
    Blank: styled.div`
        ${baseStyle};
        background: #FFFFFF;
        border: 2px solid #ECEFF1;
    `,
    Normal: styled.div<{isSelected: boolean}>`
        ${baseStyle};
        cursor: pointer;
        background: #FFFFFF;
        border: ${(props) => props.isSelected ? "2px dashed #546E7A" : "2px solid #ECEFF1"};
        &:hover {
            background: #F5F5F5;
        }
        &:active {
            background: #FFFFFF;
        }
    `,
    Low: styled.div<{isSelected: boolean}>`
        ${baseStyle};
        cursor: pointer;
        background: #B2DFDB;
        border: ${(props) => props.isSelected ? "2px dashed #546E7A" : "2px solid #ECEFF1"};
        &:hover {
            background: #E0F2F1;
        }
        &:active {
            background: #B2DFDB;
        }
    `,
    High: styled.div<{isSelected: boolean}>`
        ${baseStyle};
        cursor: pointer;
        background: #FFCDD2;
        border: ${(props) => props.isSelected ? "2px dashed #546E7A" : "2px solid #ECEFF1"};
        &:hover {
            background: #FFEBEE;
        }
        &:active {
            background: #FFCDD2;
        }
    `,
    Zero: styled.div<{isSelected: boolean}>`
        ${baseStyle};
        cursor: pointer;
        background: #FFF9C4;
        border: ${(props) => props.isSelected ? "2px dashed #546E7A" : "2px solid #ECEFF1"};
        &:hover {
            background: #FFFDE7;
        }
        &:active {
            background: #FFF9C4;
        }
    `
};

const DayLabel = styled.div`
    height: 20%;
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
`;

const DayValueText = styled.div`
    height: 80%;
    font-size: 20px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TodayLabel = styled.span`
    color: #4DB6AC;
`;