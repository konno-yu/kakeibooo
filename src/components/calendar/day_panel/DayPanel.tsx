import styled, { css } from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import ImgPath from '../../../images/medal.svg';

interface Props {
  dayIndex: number | null;
  children?: number;
  isToday?: boolean;
  isSelected?: boolean;
  type: 'zero' | 'low' | 'normal' | 'high';
  onClick?: (dayIndex: number) => void;
}

export const DayPanel: React.FC<Props> = ({
  dayIndex,
  children,
  isToday = false,
  isSelected = false,
  type,
  onClick,
}) => {
  if (dayIndex === null) {
    return <Styled.Blank />;
  }

  const handleOnClick = () => {
    onClick(dayIndex);
  };

  const PanelBody: JSX.Element = (
    <>
      <DayLabel key={dayIndex}>
        {String(dayIndex).padStart(2, '0')}
        {isToday && !isSelected && <TodayLabel>今日</TodayLabel>}
        {isSelected && <FaUserEdit size={24} />}
      </DayLabel>
      <DayValueText>¥{children.toLocaleString()}</DayValueText>
    </>
  );

  switch (type) {
    case 'zero':
      return <Styled.Zero onClick={handleOnClick}>{PanelBody}</Styled.Zero>;
    case 'low':
      return <Styled.Low onClick={handleOnClick}>{PanelBody}</Styled.Low>;
    case 'normal':
      return <Styled.Normal onClick={handleOnClick}>{PanelBody}</Styled.Normal>;
    case 'high':
      return <Styled.High onClick={handleOnClick}>{PanelBody}</Styled.High>;
  }
};

const baseStyle = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: calc(100% / 7);
  height: 100%;
  min-height: 80px;
  border-radius: 8px;
  color: #546e7a;
  font-weight: 700;
  display: flex;
  flex-direction: column;
`;

const Styled = {
  Blank: styled.div`
    ${baseStyle};
    background: #ffffff;
  `,
  Normal: styled.div`
    ${baseStyle};
    cursor: pointer;
    background: #ffffff;
    &:hover {
      background: #f5f5f5;
    }
    &:active {
      background: #ffffff;
    }
  `,
  Low: styled.div`
    ${baseStyle};
    cursor: pointer;
    background: #b2dfdb;
    &:hover {
      background: #e0f2f1;
    }
    &:active {
      background: #b2dfdb;
    }
  `,
  High: styled.div`
    ${baseStyle};
    cursor: pointer;
    background: #ffcdd2;
    &:hover {
      background: #ffebee;
    }
    &:active {
      background: #ffcdd2;
    }
  `,
  Zero: styled.div`
    ${baseStyle};
    cursor: pointer;
    background: #fff9c4;
    background-image: url(${ImgPath});
    background-size: 50% auto;
    background-position: center center;
    background-repeat: no-repeat;
    &:hover {
      background: #fffde7;
    }
    &:active {
      background: #fff9c4;
    }
  `,
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
  color: #4db6ac;
`;
