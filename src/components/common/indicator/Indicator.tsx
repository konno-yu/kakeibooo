import { css, Theme, useTheme } from '@emotion/react';

interface Props {
  value: { [key: string]: number };
  range: [number, number];
  showLabel?: boolean;
  unit?: { type: 'prefix' | 'suffix'; name: string };
}

export const Indicator = ({ value, range, showLabel = false, unit }: Props) => {
  const theme = useTheme();
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
    barElement = <div css={[bar(values[0], keys[0], theme), firstAndLast(theme)]} />;
  } else {
    barElement = keys.map((key, i) => {
      if (i === 0) return <div css={[bar(displayValue[key], key, theme), first(theme)]} />;
      if (i === keys.length - 1) return <div css={[bar(displayValue[key], key, theme), last(theme)]} />;
      return <div css={bar(displayValue[key], key, theme)} />;
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

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: ${theme.units.px4};
  justify-content: center;
`;

const scaleLabel = (theme: Theme) => css`
  color: ${theme.colors.font};
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes.pt08};
  width: 10%;
  text-align: center;
`;

const indicator = (theme: Theme) => css`
  width: 80%;
  height: 30%;
  background: ${theme.colors.gray};
  border-radius: ${theme.units.px12};
  display: flex;
`;

const limitOver = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    ${theme.colors.primary},
    ${theme.colors.primary} ${theme.units.px2},
    ${theme.colors.palePrimary} ${theme.units.px2},
    ${theme.colors.palePrimary} ${theme.units.px4}
  );
  border-radius: ${theme.units.px12};
`;

const bar = (width: number, color: string, theme: Theme) => css`
  width: ${width}%;
  height: 100%;
  background: ${color};
  border-radius: ${theme.units.px0};
`;

const firstAndLast = (theme: Theme) => css`
  border-radius: ${theme.units.px12}; ;
`;

const last = (theme: Theme) => css`
  border-radius: ${theme.units.px0} ${theme.units.px12} ${theme.units.px12} ${theme.units.px0};
`;

const first = (theme: Theme) => css`
  border-radius: ${theme.units.px12} ${theme.units.px0} ${theme.units.px0} ${theme.units.px12}; ;
`;
