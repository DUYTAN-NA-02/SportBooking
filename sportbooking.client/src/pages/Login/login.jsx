import styles from './LoginStyles.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { login as loginA } from '../../services/authService';
import Alert from '../../components/Alert/Alert';
function login() {
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({ username: '', password: '' })

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let checkUser = localStorage.getItem('user') ? true : false
        if (checkUser) {
            navigate(`/`)
        }
    }, [])

    const handleNavigateToRegister = () => {
        navigate(`/register`)
    }

    const handleOpenAlert = (message, status) => {
        setOpen(true)
        setMessage(message)
        setStatus(status)
    }


    const handleLogin = async () => {
        setLoading(true)
        const res = await loginA(formLogin.username, formLogin.password)
        console.log(res)
        if (res.status == 401) {
            handleOpenAlert(res.data, 'error');
            setLoading(false)
            return
        }

        handleOpenAlert('Login success', 'success')
        localStorage.setItem('user', JSON.stringify(res))
        setTimeout(() => {
            setLoading(false)
            navigate(`/`)
        }, 1000)
    }
    return (
        <>
            <Box className={styles['box-login']}>
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                    }}
                    nowrap
                    variant="h4">Đăng nhập</Typography>
                <TextField
                    className={styles['text-field']}
                    id="username"
                    label="Tên đăng nhập"
                    value={formLogin.username}
                    onChange={(e) => setFormLogin({...formLogin, username: e.target.value})}
                    variant="outlined" />
                <TextField
                    className={styles['text-field']}
                    id="password"
                    label="Mật khẩu"
                    value={formLogin.password}
                    type="password"
                    onChange={(e) => setFormLogin({...formLogin, password: e.target.value})}
                    variant="outlined" />
                <LoadingButton
                    variant="contained"
                    loading={loading}
                    onClick={handleLogin}>Đăng nhập
                </LoadingButton>
                <Box>
                    <Typography
                        variant="h7">Bạn chưa có tài khoản?
                    </Typography>
                    <Typography
                        variant="h7"
                        sx={{
                            color: "blue",
                            cursor: "pointer",
                            marginLeft: "3px"
                        }}
                        onClick={handleNavigateToRegister}
                    >
                        Đăng ký
                    </Typography>
                </Box>
            </Box>
            <Alert open={open} message={message} status={status} setOpen={setOpen} />
        </>
    )
}

export default login;