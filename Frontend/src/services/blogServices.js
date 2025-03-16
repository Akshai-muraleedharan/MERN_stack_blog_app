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


  export const authCommentBlog = async (blogId,data) => {
    try {
      const response = await axiosInstance.post(`/blog/comment/${blogId}`,{
        comment:data.comment
      })
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }


  export const authCommentUpdate = async (commentId,data) => {
    try {
      const response = await axiosInstance.put(`/blog/auth/update/${commentId}`,{
        comment:data.comment
      })
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }


  
  export const authCommentDelete = async (commentId) => {
    try {
      const response = await axiosInstance.delete(`/blog/auth/delete/${commentId}`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
    } 
  }

  export const authCreateBlog = async (formData) => {
    try {

      const response = await axiosInstance.post(`/blog/create`,formData,{

        Headers:{
          "Content-Type": "multipart/form-data",
        }
      },)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
        
    } 
  }


  export const authUpdateBlog = async (formData,id) => {
    try {

      const response = await axiosInstance.put(`/blog/update/${id}`,formData,{

        Headers:{
          "Content-Type": "multipart/form-data",
        }
      },)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
        
    } 
  }

  export const authDeleteBlog = async (id) => {
    try {

      const response = await axiosInstance.delete(`/blog/delete/${id}`)
      return response?.data
    } catch (error) {
        console.error("blog error:", error.response?.data || error.message);
        throw error
        
    } 
  }





  