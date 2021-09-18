import Axios from 'axios';

var token = localStorage.getItem("token");

export function getSubscribtions() {
    return Axios.get("/api/SubscriptionApi/getall", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}