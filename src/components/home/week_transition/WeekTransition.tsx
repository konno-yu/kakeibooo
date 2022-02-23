import { FaRegFrown, FaRegGrinSquint, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  dates: number[];
  types: ('zero' | 'low' | 'normal' | 'high')[];
}

const ICONS: { [key in 'zero' | 'low' | 'normal' | 'high']: JSX.Element } = {
  zero: <FaRegGrinSquint color="#FFF59D" size={20} />,
  low: <FaRegSmile color="#80CBC4" size={20} />,
  normal: <FaRegMeh color="#E0E0E0" size={20} />,
  high: <FaRegFrown color="#EF9A9A" size={20} />,
};
const LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const WeekTransition: React.FC<Props> = ({ dates, types }) => (
  <Container>
    {types.map((type, i) => (
      <Day>
        <DayHeader>
          <DayValueText>{dates[i]}</DayValueText>
          <DayOfWeekLabel>{LABELS[i]}</DayOfWeekLabel>
        </DayHeader>
        {ICONS[type]}
      </Day>
    ))}
  </Container>
);

const Container = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const Day = styled.div`
  width: calc(100% / 7);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const DayHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayOfWeekLabel = styled.span`
  color: #546e7a;
  font-weight: 700;
  font-size: 12px;
`;

const DayValueText = styled.span`
  color: #546e7a;
  font-weight: 700;
  font-size: 16px;
`;
