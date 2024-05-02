import Box from '@mui/material/Box';
import Styles from './AuthStyles.module.scss';
function authLayout({ children }) {
    return (
        <Box
            className={Styles['auth-layout']}
        >
            {children}
        </Box>
    );
}

export default authLayout;