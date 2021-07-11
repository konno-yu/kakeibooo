import * as React from 'react';
import { useReceipt, receiptContext } from './ReceiptContext';
import ReceiptBody from './ReceiptBody';
import ReceiptFooter from './ReceiptFooter';
import ReceiptHeader from './ReceiptHeader';


const Receipt: React.FC = () => {
    const context = useReceipt();
    return (
        <div className="root--receipt">
            <receiptContext.Provider value={context}>
                <ReceiptHeader />
                <ReceiptBody />
                <ReceiptFooter />
            </receiptContext.Provider>
        </div>
    )
}

export default Receipt;