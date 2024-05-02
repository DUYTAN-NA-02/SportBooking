import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import CloseIcon from '@mui/icons-material/Close';
import { memo } from 'react';
function AlertComponent({ open, message, status, setOpen }) {

    const handleClose = () => {
        setOpen(false)
    };

    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    }

    console.log("re-render-arlet")

    return (
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
        >
            <Alert
                severity={status}
                variant="filled"
                size="small"
                sx={{ width: '100%' }}
            >
                <Box sx={styles}>
                    {message}
                    <CloseIcon
                        sx={{
                            cursor: 'pointer',
                            marginLeft: '10px'
                        }}
                        fontSize="small"
                        onClick={handleClose}
                    />
                </Box>
            </Alert>
        </Snackbar>
    )
}

export default memo(AlertComponent);