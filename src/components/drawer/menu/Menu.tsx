import { cloneElement, ReactElement, useState } from 'react';
import { FlexBox } from '../../common/flex_box/FlexBox';
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
    <FlexBox direction="column" gap={16}>
      {children.map((child) => {
        if (child.props.id === selected) {
          return cloneElement(child, { selected: true, onChange: handleOnChange });
        }
        return cloneElement(child, { onChange: handleOnChange });
      })}
    </FlexBox>
  );
};
