import styled from 'styled-components';
import IconPath from '../../../images/avatar.svg';

interface Props {
  iconOnly?: boolean;
  username: string;
  userId: string;
}

export const Account: React.VFC<Props> = ({ iconOnly = false, username, userId }) => (
  <AccountContainer>
    <img src={IconPath} />
    {iconOnly === false && (
      <>
        <UserNameText>{username}</UserNameText>
        <UserIdText>@{userId}</UserIdText>
      </>
    )}
  </AccountContainer>
);

const AccountContainer = styled.div`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 70px;
  width: 70px;
  border: 3px solid #cfd8dc;
  border-radius: 100px;
`;

const UserNameText = styled.span`
  font-size: 16px;
  margin-top: 4px;
  font-weight: 600;
  color: #546e7a;
`;

const UserIdText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #90a4ae;
`;
