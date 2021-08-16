import * as React from 'react';
import { useReceipt, receiptContext } from './ReceiptContext';
import { ReceiptBody } from './ReceiptBody';
import { ReceiptFooter } from './ReceiptFooter';
import { ReceiptHeader } from './ReceiptHeader';
import styled from 'styled-components';


export const Receipt: React.FC = () => {
    const context = useReceipt();
    return (
        <SC.ReceiptRoot>
            <receiptContext.Provider value={context}>
                <ReceiptHeader />
                <ReceiptBody />
                <ReceiptFooter />
            </receiptContext.Provider>
        </SC.ReceiptRoot>
    )
}

const SC = {
    ReceiptRoot: styled.div`
        width: 25%;
        height: calc(100vh - 24px);
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `
};