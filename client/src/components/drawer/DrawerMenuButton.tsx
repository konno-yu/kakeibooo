import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import * as React from 'react';
import {
    Button
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface DrawerMenuButtonProps {
    children: string;
    className: string;
    icon: JSX.Element;
    value: Drawer.MenuItem;
    onChange?: (newValue: string) => void;
}

const DrawerMenuButton: React.FC<DrawerMenuButtonProps> = (props) => {
    const handleChange = () => {
        if (props.onChange) {
            return props.onChange(props.value);
        }
        return {};
    }
    return (
        <Button onClick={handleChange} className={props.className} size="large" variant="contained" disableElevation startIcon={props.icon}>
            { props.children }
        </Button>
    )
}


export default DrawerMenuButton;