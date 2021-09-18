import Axios from 'axios';

var token = localStorage.getItem('token');

export function getallQueries() {
    return Axios.get("/api/FeedbackApi/getallmy", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export function postyouQuery(query) {
    return Axios.post("/api/FeedbackApi/newfeedback",
        {
            message: query
        }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export function getmyQuery(id) {
    return Axios.get("/api/FeedbackApi/getmy", {
        params: {
            id
        },
        headers: {
            Authorization: "Bearer " + token
        }
    })
}