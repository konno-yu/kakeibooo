import { AiFillAccountBook } from "react-icons/ai"
import { FaRegLightbulb } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"
import { RiFridgeFill } from "react-icons/ri"
import { TiHome } from "react-icons/ti"
import styled from "styled-components"
import { Account } from "./Account"
import { AppTitle } from "./AppTitle"
import { Menu } from "./Menu"
import { MenuItem } from "./MenuItem"

export const Drawer: React.FC = () => {
    return (
        <Container>
            <AppTitle />
            <Account iconOnly={false} />
            <Menu>
                <MenuItem selected icon={<TiHome />}>ホーム</MenuItem>
                <MenuItem icon={<AiFillAccountBook />}>家計簿</MenuItem>
                <MenuItem icon={<FaRegLightbulb />}>光熱費</MenuItem>
                <MenuItem icon={<RiFridgeFill />}>冷蔵庫</MenuItem>
                <MenuItem icon={<IoSettingsSharp />}>設定</MenuItem>
            </Menu>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;
`