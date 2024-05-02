import Box from '@mui/material/Box';
import Header from '../../components/Header/index';
import Styles from './MainStyles.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function mainLayout({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stringAvatar, setStringAvatar] = useState(null);

    useEffect(() => {
        let userC = localStorage.getItem('user')
        if (!userC) {
            console.log("User not found")
            navigate(`/login`)
        }
        userC = JSON.parse(userC)
        setUser(userC)
        setStringAvatar(userC?.userName[0].toUpperCase())
    }, [])

    return (
        <Box className={Styles.mainLayout}>
            <Header className={Styles.header} avatarName={stringAvatar} />
            <Box className={Styles.content}>
                {children}
            </Box>
        </Box>
    );
}

export default mainLayout;