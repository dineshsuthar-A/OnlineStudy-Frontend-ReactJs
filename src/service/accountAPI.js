import Axios from 'axios';

export function uploadDP(formData) {
    return Axios.post("/api/AccountApi/updatedp", formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

export function getAccountdetails() {
    return Axios.get("/api/AccountApi/getpersonalinfo", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}