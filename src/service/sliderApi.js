import Axios from 'axios';

export function getSlider() {
    var token = localStorage.getItem("token");
    return Axios.get("/api/AppSlidePhotoApi/getall", {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}