import * as React from 'react';
import styled from 'styled-components';
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
        <SC.DrawerMenu>
            {
                props.children.map(menuButton => {
                    if (menuButton.props.value === props.value) {
                        return React.cloneElement(menuButton, { selected: true, onChange: handleChange });
                    }
                    return React.cloneElement(menuButton, { onChange: handleChange });
                })
            }
        </SC.DrawerMenu>
    );
}

const SC = {
    DrawerMenu: styled.div`
        height: auto;
        padding: 10px 10px;
        display: flex;
        flex-direction: column;
    `
};