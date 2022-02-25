import styled from 'styled-components';

interface Props {
  value: { [key: string]: number };
  range: [number, number];
  showLabel?: boolean;
  unit?: { type: 'prefix' | 'suffix'; name: string };
}

export const Indicator = ({ value, range, showLabel = false, unit }: Props) => {
  const displayValue: { [key: string]: number } = {};
  Object.keys(value).forEach((key) => {
    if (value[key] > 0) {
      displayValue[key] = (value[key] / range[1]) * 100;
    }
  });
  const keys = Object.keys(displayValue);
  const values = Object.values(displayValue);

  const isLimitOver = (v: number[]) => v.reduce((pre, cur) => pre + cur, 0) > 100;

  let barElement: JSX.Element | JSX.Element[];

  if (isLimitOver(values)) {
    barElement = <LimitOverBar />;
  } else if (keys.length === 1) {
    barElement = <FirstLastBar width={values[0]} color={keys[0]} />;
  } else {
    barElement = keys.map((key, i) => {
      if (i === 0) return <FirstBar width={displayValue[key]} color={key} />;
      if (i === keys.length - 1) return <LastBar width={displayValue[key]} color={key} />;
      return <Bar width={displayValue[key]} color={key} />;
    });
  }

  const createLabelText = (text: number, u: Props['unit']) =>
    u.type === 'prefix' ? `${u.name}${text}` : `${text}${u.name}`;

  return (
    <Container>
      {showLabel && <ScaleLabel>{createLabelText(range[0], unit)}</ScaleLabel>}
      <StyledIndicator>{barElement}</StyledIndicator>
      {showLabel && <ScaleLabel>{createLabelText(range[1], unit)}</ScaleLabel>}
    </Container>
  );
};

const Container = styled.div`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;

const ScaleLabel = styled.span`
  color: #546e7a;
  font-weight: 700;
  font-size: 12px;
  width: 10%;
  text-align: center;
`;

const StyledIndicator = styled.div`
  width: 80%;
  height: 30%;
  background: #eceff1;
  border-radius: 12px;
  display: flex;
`;

const LimitOverBar = styled.div`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(-45deg, #ff8a80, #ff8a80 2px, #ffcdd2 2px, #ffcdd2 4px);
  border-radius: 12px;
`;

const Bar = styled.div<{ width: number; color: string }>`
  ${({ width }) => `width: ${width}%`};
  height: 100%;
  ${({ color }) => `background: ${color}`};
  border-radius: 0;
`;

const FirstLastBar = styled(Bar)`
  border-radius: 12px;
`;

const LastBar = styled(Bar)`
  border-radius: 0 12px 12px 0;
`;

const FirstBar = styled(Bar)`
  border-radius: 12px 0 0 12px;
`;
