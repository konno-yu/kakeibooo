import * as React from 'react';
import '../../style/drawer.scss';
import { AppIcon } from './AppIcon';
import { DrawerMenu } from './DrawerMenu';
import { DrawerMenuButton } from './DrawerMenuButton';
import { DrawerBanner } from './DrawerBanner';
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
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={<TiHome/>}>ホーム</DrawerMenuButton>
                <DrawerMenuButton value="finance" className="drawer-menu-item" icon={<AiFillAccountBook />}>家計簿</DrawerMenuButton>
                <DrawerMenuButton value="analyze" className="drawer-menu-item" icon={<BsFillBarChartFill />}>分析</DrawerMenuButton>
                <DrawerMenuButton value="fridge" className="drawer-menu-item" icon={<RiFridgeFill />}>冷蔵庫</DrawerMenuButton>
                <DrawerMenuButton value="setting" className="drawer-menu-item" icon={<IoSettingsSharp />}>設定</DrawerMenuButton>
            </DrawerMenu>
            <DrawerBanner />
        </>
    )
}

