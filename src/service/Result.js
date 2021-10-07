import Axios from 'axios';
var token = localStorage.getItem("token");
export function getallresult() {

    return Axios.get("/api/ResultApi/getall", {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}
export function getallresultbyBatch(id) {
    return Axios.get("/api/ResultApi/getbybatch", {
        params: {
            batchId: id
        },
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export function getresult(id) {
    return Axios.get("/api/ResultApi/getresult", {
        params: {
            resultId: id
        }
        ,
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export function rank(id, count) {
    return Axios.get("/api/ResultApi/top", {
        params: {
            paperId: id,
            count: count
        }
        ,
        headers: {
            Authorization: "Bearer " + token
        }
    });

}