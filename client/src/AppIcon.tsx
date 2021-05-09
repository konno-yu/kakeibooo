import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

const AppIcon: React.FC = () => {
    return (
        <div className="root--icon">
            <FontAwesomeIcon icon={faPiggyBank} />
            <div className="title">Kakeiboooo</div>
        </div>
    )
}

export default AppIcon;