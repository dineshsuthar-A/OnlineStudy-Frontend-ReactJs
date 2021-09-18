import Axios from 'axios';


export function register(mail, mobile, password) {
    return Axios.post("/api/AccountApi/register", {
        phoneNumber: mobile,
        password: password,
        email: mail,
        confirmPassword: password
    }
    )
}