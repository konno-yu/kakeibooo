import styled, { css } from "styled-components";

type ButtonType = 'filled' | 'outlined';
// TODO これ以上増やす場合はスタイルの場合分けが必要
type ColorPattern = 'normal' | 'accent';

interface Props {
    variant: ButtonType;
    label: string;
    color?: ColorPattern;
    disabled?: boolean;
    icon?: JSX.Element;
    width: string | number;
    onClick: () => void;
}

export const Button: React.VFC<Props> = ({
    variant,
    label,
    color,
    disabled,
    icon,
    width = '100%',
    onClick
}) => {
    if (disabled) {
        return <Styled.DisabledButton width={width}>{icon}{label}</Styled.DisabledButton>
    }
    if (variant === 'filled') {
        return <Styled.FilledButton onClick={onClick} width={width} color={color}>{icon}{label}</Styled.FilledButton>
    }
    return (
        <Styled.OutlinedButton onClick={onClick} width={width} color={color}>{icon}{label}</Styled.OutlinedButton>
    );
};

const baseStyle = css`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    padding: 8px 12px;
    border-radius: 100px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
`;
const Styled = {
    DisabledButton: styled.button<Pick<Props, 'width'>>`
        ${baseStyle};
        ${(props) => `width: ${props.width}`};
        background: #E0E0E0;
        border: 1px solid #BDBDBD;
        color: #BDBDBD;
        cursor: auto;
    `,
    FilledButton: styled.button<{ color: ColorPattern, width: string | number }>`
        ${baseStyle};
        ${({width}) => `width: ${width}`};
        color: #FFFFFF;
        ${({ color }) => color === 'normal' ? css`
            background: #607D8B;
            border: 1px solid #607D8B;
            &:hover {
                background: #90a4ae;
                border: 1px solid #90a4ae;
            },
            &:active {
                background: #607D8B;
                border: 1px solid #607D8B;
            }
        ` : css`
            background: #F44336;
            border: 1px solid #F44336;
            &:hover {
                background: #e57373;
                border: 1px solid #e57373;
            },
            &:active {
                background: #F44336;
                border: 1px solid #F44336;
            }
        `}
    `,
    OutlinedButton: styled.button<{ color: ColorPattern, width: string | number }>`
        ${baseStyle};
        ${({width}) => `width: ${width}`};
        color: ${({ color }) => color === 'normal' ? '#607D8B' : '#F44336'};
        border: ${({ color }) => color === 'normal' ? '1px solid #607D8B' : '1px solid #F44336'};
        ${({ color }) => color === 'normal' ? css`
            background: #FFFFFF;
            &:hover {
                background: #ECEFF1;
            },
            &:active {
                background: #FFFFFF;
            }
        ` : css`
            background: #FFFFFF;
            &:hover {
                background: #FFEBEE;
            },
            &:active {
                background: #FFFFFF;
            }
        `}
    `
};