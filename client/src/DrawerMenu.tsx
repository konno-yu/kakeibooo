import * as React from 'react';
import { DrawerMenuButtonProps } from './DrawerMenuButton';

interface DrawerMenuProps {
    children: React.ReactElement<DrawerMenuButtonProps>[];
    value: string;  //TODO ここはあとで型定義する
    onChange: (newValue: string) => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = (props) => {
    const handleChange = (newValue: string) => {
        props.onChange(newValue);
    }
    return (
        <div className="root--drawer">
            {
                props.children.map(menuButton => {
                    if (menuButton.props.value === props.value) {
                        return React.cloneElement(menuButton, { className: "menu-item selected", onChange: handleChange });
                    }
                    return React.cloneElement(menuButton, { onChange: handleChange });
                })
            }
        </div>
    );
}

export default DrawerMenu;