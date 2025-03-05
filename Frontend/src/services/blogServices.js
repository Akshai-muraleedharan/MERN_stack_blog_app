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


  export const mostViewBlog = async (blogId) => {
    try {
      const response = await axiosInstance.get(`/blog/mostview`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }




  // auth function below


  export const authFetchBlogData = async (page,limit) => {
    try {
      const response = await axiosInstance.get(`/blog/auth/blogs?page=${page}&limit=${limit}`)

      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    }
  }


  export const authSingleBlogPage = async (blogId) => {
    try {
      const response = await axiosInstance.get(`/blog/auth/${blogId}`)

      
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }


  export const authPageView = async (blogId) => {
    try {
      const response = await axiosInstance.put(`/blog/auth/view/${blogId}`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }


  
  export const authLike = async (blogId) => {
    try {
 
      const response = await axiosInstance.put(`/blog/like/${blogId}`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }


  export const authUnLike = async (blogId) => {
    try {

      const response = await axiosInstance.put(`/blog/unlike/${blogId}`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }

  export const authMostViewBlog = async (blogId) => {
    try {
      const response = await axiosInstance.get(`/blog/mostview`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }





  