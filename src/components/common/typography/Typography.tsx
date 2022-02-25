import styled, { css } from 'styled-components';

interface Props {
  type: 'header' | 'subHeader';
  variant: 'normal' | 'accent' | 'helper';
  children: string;
}

export const Typography = ({ type = 'header', variant = 'normal', children }: Props) => {
  switch (variant) {
    case 'normal':
      return <NormalText type={type}>{children}</NormalText>;
    case 'accent':
      return <AccentText type={type}>{children}</AccentText>;
    case 'helper':
      return <HelperText type={type}>{children}</HelperText>;
    default:
      return <div />;
  }
};

const baseStyle = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 900;
`;

const NormalText = styled.span<Pick<Props, 'type'>>`
  ${baseStyle};
  color: #546e7a;
  ${({ type }) => (type === 'header' ? 'font-size: 24px;' : 'font-size: 18px;')}
`;

const AccentText = styled.span<Pick<Props, 'type'>>`
  ${baseStyle};
  color: #4db6ac;
  ${({ type }) => (type === 'header' ? 'font-size: 24px;' : 'font-size: 18px;')}
`;

const HelperText = styled.span<Pick<Props, 'type'>>`
  ${baseStyle};
  color: #cecece;
  ${({ type }) => (type === 'header' ? 'font-size: 24px;' : 'font-size: 18px;')}
`;
