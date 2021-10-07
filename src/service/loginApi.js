import Axios from 'axios';

var token = localStorage.getItem("token");

export function changePassword(current, pass) {
    return Axios.post("/api/AccountApi/changepassword",
        {
            oldPassword: current,
            newPassword: pass,
            confirmPassword: pass
        }
        , {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )
}