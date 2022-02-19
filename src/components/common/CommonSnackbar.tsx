// import { ReactNode } from "react";
// import { Snackbar, Slide } from '@material-ui/core';
// import styled from "styled-components";
// import { Alert } from "@material-ui/lab";

// interface SnackbarProps {
//     message: string;
//     icon: ReactNode
// }

// export const CommonSnackbar: React.FC<SnackbarProps> = (props) => {
//     return (
//         <Snackbar
//             open={true}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             TransitionComponent={Slide}
//             autoHideDuration={1000}
//         >
//             <S.Alert icon={props.icon} variant='filled'>
//                 {props.message}
//             </S.Alert>

//         </Snackbar>

//     )
// }

// const S = {
//     Alert: styled(Alert)`
//         background: #546E7A;
//         font-weight: 700;
//     `
// }