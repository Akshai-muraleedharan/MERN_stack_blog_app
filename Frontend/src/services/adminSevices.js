import { axiosInstance } from "./api";



 export const  adminLogin = async (data) => {
        try {
            const response = await axiosInstance.post('/admin/login',{
                email:data.email,
                password:data.password
            })
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }

    }

    export const totalBlogs = async () => {
        try {

            const response = await axiosInstance.get('/admin/blog/total')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }


    export const totaluser = async () => {
        try {

            const response = await axiosInstance.get('/admin/user/total')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }


    export const approvedBlogs = async () => {
        try {

            const response = await axiosInstance.get('/admin/approved/blog/total')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }


    
    export const userList = async (page,limit) => {
        try {

            const response = await axiosInstance.get(`/admin/users/page?page=${page}&limit=${limit}`)
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }

        
     
    export const blogDelete = async (id) => {
        try {

            const response = await axiosInstance.delete(`/admin/blogs/${id}`)
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }
    
    