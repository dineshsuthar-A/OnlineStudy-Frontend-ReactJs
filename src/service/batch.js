import Axios from 'axios'

export function getBatch() {
    var token = localStorage.getItem("token");
    return Axios.get("/api/BatchApi/getall", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}
