     import axios from "axios"


    export const axiosInstance = axios.create({
        baseURL:"http://localhost:4800/api/v1",
        withCredentials:true
       })