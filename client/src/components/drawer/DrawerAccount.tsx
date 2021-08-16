import * as React from 'react';
import styled from 'styled-components';
import { FaceIcon } from './DrawerSvgIcons';

export const DrawerAccount: React.FC = () => {
    return (
        <SC.DrawerAccount>
            <SC.DrawerImage>
                <FaceIcon />
            </SC.DrawerImage>
            <SC.DrawerUserName>ぎんぺん</SC.DrawerUserName>
            <SC.DrawerUserId>@pepepenguin</SC.DrawerUserId>
        </SC.DrawerAccount>
    )
}

const SC = {
    DrawerAccount: styled.div`
        height: 20%;
        padding: 10px 0 0 0;
        margin: 0 0 4px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    DrawerImage: styled.div`
        height: 70px;
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid #CFD8DC;
        border-radius: 100px;
    `,
    DrawerUserName: styled.div`
        font-size: 16px;
        font-weight: 600;
        color: #546E7A;
        margin-top: 4px;
    `,
    DrawerUserId: styled.div`
        color: #90A4AE;
        font-size: 14px;
        font-weight: 600;;
    `
};