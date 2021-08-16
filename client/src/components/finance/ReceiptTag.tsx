import { IconButton, InputBase } from "@material-ui/core";
import { ChangeEvent, useContext } from "react";
import { AiFillShopping } from "react-icons/ai";
import { HiCurrencyYen } from "react-icons/hi";
import { FaTrashAlt, FaCircle } from "react-icons/fa";
import DailyReceiptModel from "./model/DailyReceiptModel";
import ReceiptModel from "./model/ReceiptModel";
import { receiptContext } from "./ReceiptContext";
import styled from "styled-components";

interface ReceiptTagProps {
    model: ReceiptModel;
    ordinary: number;
}

export const ReceiptTag: React.FC<ReceiptTagProps> = (props) => {
    const context = useContext(receiptContext);

    const getCurrentDailyReceipt = () => context.dailyReceipt;
    const setNewDailyReceipt = (newDailyReceipt: ReceiptModel[]) => context.setDailyReceipt(new DailyReceiptModel(newDailyReceipt));

    const onDetectInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: 'storeName' | 'cost') => {
        const current = getCurrentDailyReceipt();
        const inputText = (event.target as HTMLInputElement).value;
        if (target === "storeName") {
            current.receipts[props.ordinary].storeName = inputText;
        } else {
            current.receipts[props.ordinary].cost = +inputText;
        }
        setNewDailyReceipt(current.receipts);
    }

    const onDeleteClick = () => {
        const current = getCurrentDailyReceipt();
        current.delete(props.ordinary);
        setNewDailyReceipt(current.receipts);
    }

    return (
        <SC.ReceiptTag>
            <SC.TagLeftPart>
                <FaCircle color="#f5f5f5" size={12}/>
            </SC.TagLeftPart>
            <SC.TagCenterPart>
                <SC.TagInputPart>
                    <AiFillShopping className="icona" size={24} color="#546e7a"/>
                    <InputBase margin="dense" value={props.model.storeName} onChange={(event) => onDetectInputChange(event, 'storeName')}/>
                </SC.TagInputPart>
                <SC.TagInputPart>
                    <HiCurrencyYen size={24} color="#546e7a" />
                    <InputBase margin="dense" value={props.model.cost === 0 ? null : props.model.cost} onChange={(event) => onDetectInputChange(event, 'cost')} />
                </SC.TagInputPart>
            </SC.TagCenterPart>
            <SC.TagRightPart>
                <SC.TagTrashButton onClick={onDeleteClick}>
                    <FaTrashAlt size={20} color="#546e7a" />
                </SC.TagTrashButton>
            </SC.TagRightPart>
        </SC.ReceiptTag>
    )
}

const SC = {
    ReceiptTag: styled.div`
        height: 18%;
        margin-bottom: 8px;
        background: #F5F5F5;
        display: flex;
    `,
    TagLeftPart: styled.div`
        width: 10%;
        height: 100%;
        background: #4DB6AC;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    TagCenterPart: styled.div`
        width: 80%;
        padding: 4px 4px 4px 12px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    `,
    TagInputPart: styled.div`
        display: flex;
        align-items: center;
        input {
            font-family: "M PLUS Rounded 1c", sans-serif;
            padding: 0 0 0 4px;
            color: #546e7a;
            font-weight: 800;
            font-size: 16px;
            border-bottom: 1px solid #e0e0e0;
            width: 90%;
        }
    `,
    TagRightPart: styled.div`
        display: flex;
        align-items: center;
        padding: 0 4px 0 0;
    `,
    TagTrashButton: styled(IconButton)`
        height: 50%;
    `
};