import * as React from 'react';

import bannerImg from '../../images/banner.svg';

export const DrawerBanner: React.FC = () => {
    return (
        <div className="root--banner">
            <img src={bannerImg} width="70%" />
            <div className="title">今日の食費はいくら？</div>
        </div>
    )
}

