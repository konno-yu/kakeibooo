import * as React from 'react';
import { AppIcon } from './AppIcon';
import { DrawerMenu } from './DrawerMenu';
import { DrawerMenuButton } from './DrawerMenuButton';
import { AiFillAccountBook } from 'react-icons/ai';
import { TiHome } from 'react-icons/ti';
import { BsFillBarChartFill } from 'react-icons/bs';
import { RiFridgeFill } from 'react-icons/ri';
import { IoSettingsSharp } from 'react-icons/io5';
import { DrawerAccount } from './DrawerAccount';

export const Drawer: React.FC = () => {
    const [value, setValue] = React.useState<Drawer.MenuItem>('home');

    const handleChange = (newValue: Drawer.MenuItem) => {
        setValue(newValue);
    }
    return (
        <>
            <AppIcon />
            <DrawerAccount />
            <DrawerMenu value={value} onChange={handleChange}>
                <DrawerMenuButton value="home" icon={<TiHome/>}>ホーム</DrawerMenuButton>
                <DrawerMenuButton value="finance" icon={<AiFillAccountBook />}>家計簿</DrawerMenuButton>
                <DrawerMenuButton value="analyze" icon={<BsFillBarChartFill />}>分析</DrawerMenuButton>
                <DrawerMenuButton value="fridge" icon={<RiFridgeFill />}>冷蔵庫</DrawerMenuButton>
                <DrawerMenuButton value="setting" icon={<IoSettingsSharp />}>設定</DrawerMenuButton>
            </DrawerMenu>
        </>
    )
}