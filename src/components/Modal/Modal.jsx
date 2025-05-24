import { Box, Typography, Modal } from '@mui/material';

/**
 * ModalComponent
 * 
 * A reusable modal dialog built using Material UI's Modal component.
 * Displays a title and message centered in the viewport.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls whether the modal is visible
 * @param {function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - Title text displayed at the top of the modal
 * @param {string} props.message - Message content displayed in the modal body
 * 
 * @returns {JSX.Element} A styled modal dialog
 */
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
