import styled from "styled-components"
import AccountImage from '../../images/avatar.svg';

interface Props {
    iconOnly: boolean;
}

export const Account: React.VFC<Props> = ({
    iconOnly = false
}) => {
    return (
        <AccountContainer>
            <Image src={AccountImage} />
            { iconOnly === false &&
                <>
                    <UserNameText>かけい坊</UserNameText>
                    <UserIdText>@Kakeiboy</UserIdText>
                </>
            }
        </AccountContainer>
    )
}

const AccountContainer = styled.div`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled.img`
    height: 70px;
    width: 70px;
    border: 3px solid #CFD8DC;
    border-radius: 100px;
`;

const UserNameText = styled.span`
    font-size: 16px;
    margin-top: 4px;
    font-weight: 600;
    color: #546E7A;
`;

const UserIdText = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #90A4AE;
`;