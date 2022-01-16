import { ReactElement } from "react"
import styled from "styled-components"
import { MenuItem } from "./MenuItem"

interface Props {
    children: ReactElement<typeof MenuItem>[];
}
export const Menu: React.FC<Props> = ({
    children
}) => {
    return (
        <MenuContainer>
            {children}
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`