import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const RegisterSuccessModal = ({ regSucModalOpen, handleSucModalClose }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={regSucModalOpen}
            onClose={handleSucModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={regSucModalOpen}>
                <Alert sx={style} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — <strong>check it out!</strong>
                </Alert>
            </Fade>

        </Modal >
    );
};

export default RegisterSuccessModal;