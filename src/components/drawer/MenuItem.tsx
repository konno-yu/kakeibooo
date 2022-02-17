import styled from "styled-components";

interface Props {
    selected?: boolean;
    icon?: JSX.Element;
}
export const MenuItem: React.FC<Props> = ({
    selected = false,
    icon,
    children
}) => {
    return (
        <StyledMenuItem selected={selected}>
            {icon}
            {children}
        </StyledMenuItem>
    );
}

const StyledMenuItem = styled.button<Props>`
    font-family: "M PLUS Rounded 1c", sans-serif;
    height: 40px;
    width: 160px;
    display: flex;
    padding: 0 12px 0 12px;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    background: ${(props) => props.selected ? "#80CBC4" : "none" };
    color: ${(props) => props.selected ? "#FFFFFF" : "#546E7A" };
    &:hover {
        background: ${(props) => props.selected ? "#b2dfdb" : "#EEEEEE" };
    }
    &:active {
        background: ${(props) => props.selected ? "#80CBC4" : "none" };
    }
`