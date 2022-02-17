import styled, { css } from "styled-components"

interface Props {
    type: 'header' | 'subHeader';
    variant: 'normal' | 'accent' | 'helper'
}

export const Typography: React.FC<Props> = ({
    type = 'header',
    variant = 'normal',
    children
}) => {
    switch (variant) {
        case 'normal': return <NormalText type={type}>{children}</NormalText>
        case 'accent': return <AccentText type={type}>{children}</AccentText>
        case 'helper': return <HelperText type={type}>{children}</HelperText>
        default: return;
    }
}

const baseStyle = css`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-weight: 900;
`;

const NormalText = styled.span<Pick<Props, 'type'>>`
    ${baseStyle};
    color: #546E7A;
    ${({ type }) => type === 'header' ? 'font-size: 24px;' : 'font-size: 18px;'}
`;

const AccentText = styled.span<Pick<Props, 'type'>>`
    ${baseStyle};
    color: #4DB6AC;
    ${({ type }) => type === 'header' ? 'font-size: 24px;' : 'font-size: 18px;'}
`;

const HelperText = styled.span<Pick<Props, 'type'>>`
    ${baseStyle};
    color: #CECECE;
    ${({ type }) => type === 'header' ? 'font-size: 24px;' : 'font-size: 18px;'}
`