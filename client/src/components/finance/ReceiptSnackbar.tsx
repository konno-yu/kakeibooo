import { Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FiCheckCircle } from 'react-icons/fi';

interface SnackbarProps {
    message: string;
}

const ReceiptSnackbar: React.FC<SnackbarProps> = (props) => {
    return (
        <Snackbar
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Slide}
            autoHideDuration={1200}
        >
            <Alert style={{background:"#546e7a", fontWeight:700}} icon={ <FiCheckCircle />} severity="success" variant="filled">
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default ReceiptSnackbar;