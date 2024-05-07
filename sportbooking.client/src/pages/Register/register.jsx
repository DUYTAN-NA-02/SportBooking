import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Styles from './RegisterStyles.module.scss';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as valid from '../../utils/validData.js';
import Alert from '../../components/Alert/Alert';
import { register as registerA } from '../../services/authService';

function register() {
    const navigate = useNavigate();
    const [formRegister, setFormRegister] = useState({ username: '', phone: '', password: '', rePassword: '' })
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

    const handleNavigateToLogin = () => {
        navigate(`/login`)
    }

    const handleOpenAlert = (message, status) => {
        setOpen(true)
        setMessage(message)
        setStatus(status)
    }

    const handleRegister = async () => {
        if (!valid.validEmail(formRegister.username)) {
            handleOpenAlert('Invalid email', 'error')
            return
        }
        if (!valid.validPhone(formRegister.phone)) {
            handleOpenAlert('Invalid phone', 'error')
            return
        }
        if (!valid.validPassword(formRegister.password)) {
            handleOpenAlert('Invalid password', 'error')
            return
        }
        if (!valid.validRePassword(formRegister.password, formRegister.rePassword)) {
            handleOpenAlert('Re-password not same password', 'error')
            return
        }
        setLoading(true)
        const res = await registerA(formRegister.username, formRegister.phone, formRegister.password)
        console.log(res)
        if (res.status == 500) {
            handleOpenAlert(res.data[0].code, 'error');
            setLoading(false)
            return
        }

        handleOpenAlert('Register success', 'success')

        setTimeout(() => {
            setLoading(false)
            navigate(`/login`)
        }, 1000)
    }

    return (
        <>
            <Box className={Styles['box-register']}>
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                    }}
                    nowrap
                    variant="h4">Đăng ký</Typography>
                <TextField
                    className={Styles['text-field']}
                    autoFocus
                    id="username"
                    label="Email"
                    value={formRegister.username}
                    onChange={(e) => setFormRegister({ ...formRegister, username: e.target.value })}
                    variant="outlined" />
                <TextField
                    className={Styles['text-field']}
                    id="phone"
                    label="Điện thoại"
                    type="number"
                    value={formRegister.phone}
                    onChange={(e) => setFormRegister({ ...formRegister, phone: e.target.value })}
                    variant="outlined" />
                <TextField
                    className={Styles['text-field']}
                    id="password"
                    label="Mật khẩu"
                    type="password"
                    value={formRegister.password}
                    onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
                    variant="outlined" />
                <TextField
                    className={Styles['text-field']}
                    id="re-password"
                    label="Nhập lại mật khẩu"
                    type="password"
                    value={formRegister.rePassword}
                    onChange={(e) => setFormRegister({ ...formRegister, rePassword: e.target.value })}
                    variant="outlined" />
                <LoadingButton
                    onClick={handleRegister}
                    loading={loading}
                    variant="contained">Đăng ký
                </LoadingButton>
                <Box>
                    <Typography
                        variant="h7">Bạn đã có tài khoản?
                    </Typography>
                    <Typography
                        variant="h7"
                        sx={{
                            color: "blue",
                            cursor: "pointer",
                            marginLeft: "3px"
                        }}
                        onClick={handleNavigateToLogin}
                    >
                        Đăng nhập
                    </Typography>
                </Box>
            </Box>
            <Alert open={open} message={message} status={status} setOpen={setOpen} />
        </>
    )
}
export default register;