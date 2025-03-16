     import axios from "axios"


    export const axiosInstance = axios.create({
       // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`|| "http://localhost:4800/api/v1",
         baseURL:  "http://localhost:4800/api/v1",
        withCredentials:true
       })