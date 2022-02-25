import styled from 'styled-components';

const DAY_OF_WEEK_LABEL: { [key in 'ja' | 'en']: string[] } = {
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
};

interface Props {
  locale?: 'ja' | 'en';
}
export const Header = ({ locale = 'ja' }: Props) => (
  <StyledHeader>
    {DAY_OF_WEEK_LABEL[locale].map((elm) => (
      <HeaderElement>{elm}</HeaderElement>
    ))}
  </StyledHeader>
);

const StyledHeader = styled.div`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  display: flex;
  align-items: flex-end;
`;

const HeaderElement = styled.div`
  width: calc(100% / 7);
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: 800;
  color: #546e7a;
  border-bottom: 1.5px solid #546e7a;
  text-align: center;
`;
