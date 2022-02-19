import { useState } from "react"
import { AiFillAccountBook } from "react-icons/ai"
import { FaRegLightbulb } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"
import { RiFridgeFill } from "react-icons/ri"
import { TiHome } from "react-icons/ti"
import styled from "styled-components"
import { Account } from "./Account"
import { AppTitle } from "./AppTitle"
import { Menu } from "./menu/Menu"
import { MenuItem } from "./menu/MenuItem"

export const Drawer: React.FC = () => {
    const [selected, setSelected] = useState("home");
    const handleChange = (selected: string) => setSelected(selected);
    return (
        <Container>
            <AppTitle />
            <Account iconOnly={false} />
            <Menu value={selected} onChange={handleChange}>
                <MenuItem id="home" icon={<TiHome />}>ホーム</MenuItem>
                <MenuItem id="household" icon={<AiFillAccountBook />}>家計簿</MenuItem>
                <MenuItem id="utility_cost" icon={<FaRegLightbulb />}>光熱費</MenuItem>
                <MenuItem id="fridge" icon={<RiFridgeFill />}>冷蔵庫</MenuItem>
                <MenuItem id="setting" icon={<IoSettingsSharp />}>設定</MenuItem>
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