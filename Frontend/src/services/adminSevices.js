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

    