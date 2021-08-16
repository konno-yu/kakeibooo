import * as React from 'react';
import Logo from '../../images/icon.svg';

export const AppIcon: React.FC = () => {
    return (
        <div className="root--icon">
            <img src={Logo} width={30}/>
            <div className="title">Kakeiboooo</div>
        </div>
    )
}

