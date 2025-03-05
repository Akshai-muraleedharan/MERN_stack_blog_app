import { axiosInstance } from "./api"



  export const fetchBlogData = async (page,limit) => {
    try {
      const response = await axiosInstance.get(`/blog/data?page=${page}&limit=${limit}`)

      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    }
  } 

  export const singleBlogPage = async (blogId) => {
    try {
      const response = await axiosInstance.get(`/blog/data/${blogId}`)

      
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }


  export const pageView = async (blogId) => {
    try {
      const response = await axiosInstance.put(`/blog/view/${blogId}`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }

  