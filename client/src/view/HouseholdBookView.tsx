import * as React from 'react';
import { Calendar } from '../components/calendar/__Calendar';
import { Receipt } from '../components/receipt/Receipt';
import styled from 'styled-components';

export const HouseholdBookView: React.FC = () => {
    return (
        <SC.FinanceView>
                <Calendar />
                <Receipt />
        </SC.FinanceView>
    )
}

const SC = {
    FinanceView: styled.div`
        height: calc(100vh - 24px);
        padding: 12px;
        display: flex;
        justify-content: space-between;
    `
};