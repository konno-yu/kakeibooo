import * as React from 'react';
import {
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface DrawerMenuButtonProps {
    children: string;
    icon: JSX.Element;
    value: Drawer.MenuItem;
    onChange?: (newValue: string) => void;
    selected?: true;
}

export const DrawerMenuButton: React.FC<DrawerMenuButtonProps> = (props) => {
    const handleChange = () => {
        if (props.onChange) {
            return props.onChange(props.value);
        }
        return {};
    }
    return (
        <SC.DrawerMenuLink to={`/${props.value}`}>
            <SC.DrawerMenuItemButton selected={props.selected || false} onClick={handleChange} size="large" variant="contained" disableElevation startIcon={props.icon}>
                { props.children }
            </SC.DrawerMenuItemButton>
        </SC.DrawerMenuLink>
    )
}

const SC = {
    DrawerMenuLink: styled(Link)`
        text-decoration: none;
    `,
    DrawerMenuItemButton: styled(Button)<{selected: boolean}>`
      font-family: "M PLUS Rounded 1c", sans-serif;
      width: 100%;
      background: ${(props) => props.selected ? "#80CBC4" : "none" };
      font-size: 14px;
      font-weight: 600;
      color: ${(props) => props.selected ? "#FFFFFF" : "#546E7A" };
      justify-content: left !important;
      margin-bottom: 16px;
      &:hover {
        background: ${(props) => props.selected ? "#80CBC4" : "#EEEEEE" };
        opacity: 0.7;
      }
    `
};