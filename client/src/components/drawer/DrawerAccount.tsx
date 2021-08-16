import * as React from 'react';
import { FaceIcon } from './DrawerSvgIcons';

export const DrawerAccount: React.FC = () => {
    return (
        <div className="root--account">
            <div className="image">
                <FaceIcon />
            </div>
            <div className="username">ぎんぺん</div>
            <div className="userid">@pepepenguin</div>
        </div>
    )
}

