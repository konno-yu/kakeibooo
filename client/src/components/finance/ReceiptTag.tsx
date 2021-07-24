import { IconButton, InputBase } from "@material-ui/core";
import { ChangeEvent, useContext } from "react";
import { CircleIcon, PinAltIcon, TrashIcon, YenIcon } from "./FinanceSvgIcons";
import DailyReceiptModel from "./model/DailyReceiptModel";
import ReceiptModel from "./model/ReceiptModel";
import { receiptContext } from "./ReceiptContext";

interface ReceiptTagProps {
    model: ReceiptModel;
    ordinary: number;
}

const ReceiptTag: React.FC<ReceiptTagProps> = (props) => {
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
        <div className="tag">
            <div className="left">
                <CircleIcon color="#f5f5f5" width={10} />
            </div>
            <div className="center">
                <div className="part--input">
                    <PinAltIcon width={28} color="#546e7a"/>
                    <InputBase margin="dense" value={props.model.storeName} onChange={(event) => onDetectInputChange(event, 'storeName')}/>
                </div>
                <div className="part--input">
                    <YenIcon width={28} color="#546e7a" />
                    <InputBase margin="dense" className="yen" value={props.model.cost === 0 ? null : props.model.cost} onChange={(event) => onDetectInputChange(event, 'cost')} />
                </div>
            </div>
            <div className="right">
                <IconButton className="btn--trash" onClick={onDeleteClick}>
                    <TrashIcon color="#546e7a" />
                </IconButton>
            </div>
        </div>
    )
}

export default ReceiptTag;