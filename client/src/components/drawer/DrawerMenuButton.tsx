import * as React from 'react';
import {
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface DrawerMenuButtonProps {
    children: string;
    className: string;
    icon: JSX.Element;
    value: Drawer.MenuItem;
    onChange?: (newValue: string) => void;
}

export const DrawerMenuButton: React.FC<DrawerMenuButtonProps> = (props) => {
    const handleChange = () => {
        if (props.onChange) {
            return props.onChange(props.value);
        }
        return {};
    }
    return (
        <Link to={`/${props.value}`} className="link-text">
            <Button onClick={handleChange} className={props.className} size="large" variant="contained" disableElevation startIcon={props.icon}>
                { props.children }
            </Button>
        </Link>
    )
}

