import axios from "axios";



async function getData(api) {
    const url = "http://localhost:5155/api/"+api;
    console.log("URL:", url);
    return axios.get(url).then(responseData => responseData.data);
}


async function postData(api, data) {
    const url = "http://localhost:5155/api/"+api;
    console.log("URL:", url);
    return axios.post(url, data).then(responseData => responseData.data);
}
export {getData, postData};