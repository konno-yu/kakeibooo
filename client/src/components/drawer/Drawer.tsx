import { faBox, faCalculator, faCalendar, faChartBar, faHome, faToolbox, faTools } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import AppIcon from './AppIcon';
import DrawerMenu from './DrawerMenu';
import DrawerMenuButton from './DrawerMenuButton';
import DrawerBanner from './DrawerBanner';
import '../../style/drawer.scss';

import { EditIcon, FridgeIcon, GraphIcon, HomeIcon, SettingIcon } from './DrawerSvgIcons';
import DrawerAccount from './DrawerAccount';

const Drawer: React.FC = () => {
    const [value, setValue] = React.useState<Drawer.MenuItem>('home');

    const handleChange = (newValue: Drawer.MenuItem) => {
        setValue(newValue);
    }
    return (
        <>
            <AppIcon />
            <DrawerAccount />
            <DrawerMenu value={value} onChange={handleChange}>
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={<HomeIcon />}>ホーム</DrawerMenuButton>
                <DrawerMenuButton value="finance" className="drawer-menu-item" icon={<EditIcon />}>家計簿</DrawerMenuButton>
                <DrawerMenuButton value="analyze" className="drawer-menu-item" icon={<GraphIcon />}>分析</DrawerMenuButton>
                <DrawerMenuButton value="fridge" className="drawer-menu-item" icon={<FridgeIcon />}>冷蔵庫</DrawerMenuButton>
                <DrawerMenuButton value="setting" className="drawer-menu-item" icon={<SettingIcon />}>設定</DrawerMenuButton>
            </DrawerMenu>
            <DrawerBanner />
        </>
    )
}

export default Drawer;