import { Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FiCheckCircle } from 'react-icons/fi';
import styled from "styled-components";

interface SnackbarProps {
    message: string;
}

export const ReceiptSnackbar: React.FC<SnackbarProps> = (props) => {
    return (
        <Snackbar
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Slide}
            autoHideDuration={1200}
        >
            <SC.Alert icon={ <FiCheckCircle />} severity="success" variant="filled">
                {props.message}
            </SC.Alert>
        </Snackbar>
    )
}

const SC = {
    Alert: styled(Alert)`
        background: #546E7A;
        font-weight: 700;
    `
};