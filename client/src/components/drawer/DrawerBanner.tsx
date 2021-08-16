import * as React from 'react';
import styled from 'styled-components';

import bannerImg from '../../images/banner.svg';

export const DrawerBanner: React.FC = () => {
    return (
        <SC.DrawerBaner>
            <img src={bannerImg} width="70%" />
            <SC.BannerTitle>今日の食費はいくら？</SC.BannerTitle>
        </SC.DrawerBaner>
    )
}

const SC = {
    DrawerBaner: styled.div`
        height: 20%;
        margin: 0 14px;
        padding: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background: #80CBC4;
        border: 1px solid #80CBC4;
        border-radius: 12px;
    `,
    BannerTitle: styled.div`
        text-align: center;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 600;
    `
};