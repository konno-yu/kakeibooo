import * as React from 'react';
import { DrawerMenuButtonProps } from './DrawerMenuButton';

interface DrawerMenuProps {
    children: React.ReactElement<DrawerMenuButtonProps>[];
    value: Drawer.MenuItem;
    onChange: (newValue: string) => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = (props) => {
    const handleChange = (newValue: string) => {
        props.onChange(newValue);
    }
    return (
        <div className="root--drawer-menu">
            {
                props.children.map(menuButton => {
                    if (menuButton.props.value === props.value) {
                        return React.cloneElement(menuButton, { className: "drawer-menu-item selected", onChange: handleChange });
                    }
                    return React.cloneElement(menuButton, { onChange: handleChange });
                })
            }
        </div>
    );
}

