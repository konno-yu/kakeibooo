import styled from 'styled-components';

interface Props {
  type: 'solid' | 'dashed' | 'double' | 'dotted';
  width: number;
  color: string;
}
export const Divider = ({ type = 'solid', width = 1, color = '#BDBDBD' }: Props) => (
  <StyledDivider type={type} width={width} color={color} />
);

const StyledDivider = styled.div<Props>`
  ${(props) => `border-top: ${props.width}px ${props.type} ${props.color}`};
`;
