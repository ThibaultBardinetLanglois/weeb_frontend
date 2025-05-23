import { Box, Typography, Modal } from '@mui/material';

// 🔹 Correction : on enlève le useState car `open` est déjà une prop
const ModalComponent = ({ open, onClose, title, message }) => {
    return (
        <Modal
            open={open} 
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                bgcolor: '#c084fc',
                border: '2px solid #9333ea',
                borderRadius: '20px',
                boxShadow: 24,
                textAlign: 'center',
                p: 4,
                py: 6
            }}>
                <Typography id="modal-modal-title" variant="h4">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '1.6rem' }}>
                    {message}
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalComponent;
