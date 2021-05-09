import { faBox, faCalculator, faCalendar, faChartBar, faHome, faToolbox, faTools } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import AppIcon from './AppIcon';
import DrawerMenu from './DrawerMenu';
import DrawerMenuButton from './DrawerMenuButton';
import './style/drawer.scss';

const Drawer: React.FC = () => {
    const [selectedItem, setSelectedItem] = React.useState<string>('home');

    const handleChange = (newValue: string) => {
        setSelectedItem(newValue);
    }

    return (
        <div className="root">
            <AppIcon />
            <DrawerMenu value={selectedItem} onChange={handleChange}>
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={faHome}>ホーム</DrawerMenuButton>
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={faCalendar}>カレンダー</DrawerMenuButton>
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={faChartBar}>分析</DrawerMenuButton>
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={faBox}>冷蔵庫</DrawerMenuButton>
                <DrawerMenuButton value="home" className="drawer-menu-item" icon={faTools}>設定</DrawerMenuButton>
            </DrawerMenu>
        </div>
    )
}

export default Drawer;