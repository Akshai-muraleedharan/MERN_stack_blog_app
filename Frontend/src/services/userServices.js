import { axiosInstance } from "./api"




    export const userRegister = async (data) => {

        try {
            const response = await axiosInstance.post('/user/register',{
                username:data.username,
                email:data.email,
                password:data.password
            })
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }

    }


    export const  userLogin = async (data) => {
        try {
            const response = await axiosInstance.post('/user/login',{
                email:data.email,
                password:data.password
            })
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }

    }

    export const  googleUserAuth = async ({email,username}) => {

        
        try {
            const response = await axiosInstance.post('/user/google',{
                email:email,
                username:username
            })
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }

    }



    //  auth route function are below


    
    export const  authUserProfile = async (data) => {
        try {
            const response = await axiosInstance.get('/user/profile')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }

    }

    export const  authUserLogOut = async (data) => {
        try {
            const response = await axiosInstance.post('/user/logout')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }

    }