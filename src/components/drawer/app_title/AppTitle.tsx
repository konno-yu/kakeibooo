import styled from 'styled-components';
import Logo from '../../../images/icon.svg';

export const AppTitle = () => (
  <TitleContainer>
    <img src={Logo} width={30} alt="logo" />
    <Title>Kakeibooo</Title>
  </TitleContainer>
);

const TitleContainer = styled.div`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Title = styled.span`
  color: #546e7a;
  font-weight: 900;
  font-size: 16px;
`;
