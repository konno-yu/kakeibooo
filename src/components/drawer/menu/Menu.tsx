import { css, Theme } from '@emotion/react';
import { cloneElement, ReactElement, useState } from 'react';
import { AProps } from './MenuItem';

interface Props {
  value: string;
  onChange?: (selected: string) => void;
  children: ReactElement<AProps>[];
}
export const Menu: React.FC<Props> = ({ value, onChange, children }: Props) => {
  const [selected, setSelected] = useState(value);
  const handleOnChange = (nowSelected: string) => {
    setSelected(nowSelected);
    if (onChange) {
      onChange(nowSelected);
    }
  };
  return (
    <div css={container}>
      {children.map((child) => {
        if (child.props.id === selected) {
          return cloneElement(child, { selected: true, onChange: handleOnChange });
        }
        return cloneElement(child, { onChange: handleOnChange });
      })}
    </div>
  );
};

const container = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.units.px16};
`;
