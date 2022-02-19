import styled, { css } from "styled-components";


interface Props {
    width?: number;
    placeholder?: string;
    maxLength?: number;
    icon?: JSX.Element;
    disabled?: boolean;
}

export const Input: React.VFC<Props> = ({
    width = 200,
    placeholder = '文字を入力してください',
    maxLength = 100,
    icon,
    disabled
}) => {
    if (disabled) {
        return (
            <DisabledInput
                type="text"
                placeholder={placeholder}
                maxLength={maxLength}
                partWidth={width}
                disabled={true}
            />
        )
    }
    return (
        <InputContainer>
        {icon}
        <StyledInput
            type="text"
            placeholder={placeholder}
            maxLength={maxLength}
            partWidth={width}
            />
        </InputContainer>
    )
}

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
    border-bottom: 1px solid #E0E0E0;
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
    color: #546E7A;
    background: transparent;
    &:focus {
        outline: none;
        border-bottom: 2px solid #546E7A;
    }

`;