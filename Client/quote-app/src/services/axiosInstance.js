import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:5050/",
    headers:{
        'Content-Type': 'application/json',
        'token' : sessionStorage.getItem('token')
    },
    });

export default axiosInstance;
