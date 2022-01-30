import styled from "styled-components"
import { Typography } from "../common/Typography";

interface Props {
    icon: JSX.Element;
    title: string;
    color: string;
}
export const Card: React.FC<Props> = ({
    icon,
    title,
    color,
    children
}) => {
    return (
        <StyledCard>
            <Header>
                <Icon color={color}>{icon}</Icon>
                <Title color={color}>{title}</Title>
            </Header>
            <Body>
                {children}
            </Body>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    font-family: "M PLUS Rounded 1c", sans-serif;
    width: 100%;
    height: 200px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 12px;
    border: 2px solid #ECEFF1;
    display: flex;
    gap: 8px;
    flex-direction: column;
`;

const Header = styled.div`
    height: 20%;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Icon = styled.div<Pick<Props, 'color'>>`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({color}) => `background: ${color}`}
`;

const Title = styled.div <Pick<Props, 'color'>>`
    font-weight: 800;
    font-size: 22px;
    ${({ color }) => `color: ${color}`}
`;

const Body = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    justify-content: space-around;
`