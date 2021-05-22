import { Avatar } from '@material-ui/core';
import * as React from 'react';
import avatarPath from '../../images/avatar.svg';

const DrawerAccount: React.FC = () => {
    return (
        <div className="root--account">
            <div className="image">
                <Avatar src={avatarPath} className="avatar" variant="circle"  />
            </div>
            <div className="username">ぎんぺん</div>
            <div className="userid">@pepepenguin</div>
        </div>
    )
}

export default DrawerAccount;