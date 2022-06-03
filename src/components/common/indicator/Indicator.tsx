import { css, Theme } from '@emotion/react';

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
    barElement = <div css={limitOver} />;
  } else if (keys.length === 1) {
    barElement = <div css={[bar(values[0], keys[0]), firstAndLast]} />;
  } else {
    barElement = keys.map((key, i) => {
      if (i === 0) return <div css={[bar(displayValue[key], key), first]} />;
      if (i === keys.length - 1) return <div css={[bar(displayValue[key], key), last]} />;
      return <div css={bar(displayValue[key], key)} />;
    });
  }

  const createLabelText = (text: number, u: Props['unit']) =>
    u.type === 'prefix' ? `${u.name}${text}` : `${text}${u.name}`;

  return (
    <div css={container}>
      {showLabel && <span css={scaleLabel}>{createLabelText(range[0], unit)}</span>}
      <div css={indicator}>{barElement}</div>
      {showLabel && <span css={scaleLabel}>{createLabelText(range[1], unit)}</span>}
    </div>
  );
};

const container = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;

const scaleLabel = (theme: Theme) => css`
  color: ${theme.colors.font};
  font-weight: 700;
  font-size: 12px;
  width: 10%;
  text-align: center;
`;

const indicator = (theme: Theme) => css`
  width: 80%;
  height: 30%;
  background: ${theme.colors.gray};
  border-radius: 12px;
  display: flex;
`;

const limitOver = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(-45deg, ${theme.colors.primary}, ${theme.colors.primary} 2px, ${theme.colors.pPrimary} 2px, ${theme.colors.pPrimary} 4px);
  border-radius: 12px;
`;

const bar = (width: number, color: string) => css`
  width: ${width}%;
  height: 100%;
  background: ${color};
  border-radius: 0;
`;

const firstAndLast = css`
  border-radius: 12px;
`;

const last = css`
  border-radius: 0 12px 12px 0;
`;

const first = css`
  border-radius: 12px 0 0 12px;
`;
