import Box from '@mui/material/Box';
import {useParams } from 'react-router-dom';
function payment() {
    const { paymentId } = useParams()

    return (
        <Box>
            Page Payment {paymentId}
        </Box>
    )

}

export default payment;