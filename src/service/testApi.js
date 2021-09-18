import Axios from 'axios';
var token = localStorage.getItem("token");
export function getTest(id) {


    return Axios.get("/api/TestPaperApi/getpaper", {
        params: {
            paperId: id
        },
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export function getsubject() {

    return Axios.get("/api/SubjectApi/getall", {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export function getTestwithanswer(id) {


    return Axios.get("/api/TestPaperApi/getpaperwithanswer", {
        params: {
            paperId: id
        },
        headers: {
            Authorization: "Bearer " + token
        }
    });
}