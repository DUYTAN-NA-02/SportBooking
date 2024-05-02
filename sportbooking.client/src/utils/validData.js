export const validEmail = (email) => {
    if (email.trim() == '')
        return false;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validPhone = (phone) => {
    if (phone.trim() == '')
        return false;
    const re = /^\d{10}$/;
    return re.test(phone);
}

export const validPassword = (password) => {
    if (password.trim() == '')
        return false;
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

export const validRePassword = (password, rePassword) => {
    if (password.trim() == '' || rePassword.trim() == '')
        return false;
    return password === rePassword;
}