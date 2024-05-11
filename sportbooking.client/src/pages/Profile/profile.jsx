import { useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
function profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    window.scrollTo(0, 0);
    function stringAvatar(name) {
        return {
            sx: {
                width: 125,
                height: 125,
                fontSize: '3rem',
            },
            children: `${name[0]}`,
        };
    }

    return (
        <Box
            sx={{
                marginTop: '80px',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.1)',

            }}
        >
            <Typography
                sx={{
                    mr: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    textDecoration: 'none',
                }}
                variant="h5"
            >Thông tin tài khoản
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <Avatar {...stringAvatar(user.userName.toUpperCase())} />
                <Box>
                    <Typography
                        sx={{
                            fontFamily: 'monospace',
                            textDecoration: 'none',
                        }}
                        variant="h6"
                    ><b>Tên đăng nhập</b> {user.userName}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'monospace',
                            textDecoration: 'none',
                        }}
                        variant="h6"
                    ><b>Số điện thoại</b> {user.phoneNumber}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default profile;