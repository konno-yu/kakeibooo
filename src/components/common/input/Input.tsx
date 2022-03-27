import styled, { css } from 'styled-components';

interface Props {
  width?: number;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  icon?: JSX.Element;
  disabled?: boolean;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  width = 200,
  placeholder = '文字を入力してください',
  type = 'text',
  maxLength = 100,
  icon,
  disabled,
  value,
  onChange,
}: Props) => {
  if (disabled) {
    return <DisabledInput type="text" placeholder={placeholder} maxLength={maxLength} partWidth={width} disabled />;
  }
  return (
    <InputContainer>
      {icon}
      <StyledInput
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        partWidth={width}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const baseStyle = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 16px;
  height: 1.5rem;
  font-weight: 700;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  ::placeholder {
    font-weight: 400;
    color: #b0bec5;
    font-size: 12px;
  }
`;

const DisabledInput = styled.input<{ partWidth: number }>`
  ${baseStyle};
  ${({ partWidth }) => `width: ${partWidth}px`};
`;

const StyledInput = styled.input<{ partWidth: number }>`
  ${baseStyle};
  ${({ partWidth }) => `width: ${partWidth}px`};
  color: #546e7a;
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid #546e7a;
  }
`;
