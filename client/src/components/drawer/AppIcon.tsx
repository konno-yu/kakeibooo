import * as React from 'react';
import styled from 'styled-components';
import Logo from '../../images/icon.svg';

export const AppIcon: React.FC = () => {
    return (
        <SC.AppIcon>
            <img src={Logo} width={30}/>
            <SC.AppTitle>Kakeibooo</SC.AppTitle>
        </SC.AppIcon>
    )
}

const SC = {
    AppIcon: styled.div`
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 8px 0;
    `,
    AppTitle: styled.div`
        color: #546E7A;
        font-weight: 900;
        font-size: 16px;
        margin: 4px 0 0 8px;
    `
};