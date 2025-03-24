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

            const response = await axiosInstance.get('/admin/total/blog')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }


    export const totaluser = async () => {
        try {

            const response = await axiosInstance.get('/admin/total/user')
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }


    export const approvedBlogs = async () => {
        try {

            const response = await axiosInstance.get('/admin/approved/blogs')
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




    export const blogList = async (page,limit) => {
        try {

            const response = await axiosInstance.get(`/admin/blogs/page?page=${page}&limit=${limit}`)
            return response?.data
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error
        }
    }
    

    export const authCommentDelete = async (commentId) => {
        try {
          const response = await axiosInstance.delete(`/admin/comment/${commentId}`)
          return response?.data
        } catch (error) {
            console.error("blog error:", error.response?.data || error.message);
            throw error
        } 
      }
    

      
    export const authSingleBlog = async (id) => {
        try {
          const response = await axiosInstance.get(`/admin/single-blog/${id}`)
          return response?.data
        } catch (error) {
            console.error("blog error:", error.response?.data || error.message);
            throw error
        } 
      }


      export const authAdminApproval = async (id) => {
        try {
          const response = await axiosInstance.put(`/admin/blog-approval/${id}`)
          return response?.data
        } catch (error) {
            console.error("blog error:", error.response?.data || error.message);
            throw error
        } 
      }


      
      export const authAdminNotApproval = async (id) => {
        try {
          const response = await axiosInstance.put(`/admin/blog/not-approval/${id}`)
          return response?.data
        } catch (error) {
            console.error("blog error:", error.response?.data || error.message);
            throw error
        } 
      }


      export const authAdminUserDelete = async (id) => {
        try {
          const response = await axiosInstance.delete(`/admin/user/delete/${id}`)
          return response?.data
        } catch (error) {
            console.error("blog error:", error.response?.data || error.message);
            throw error
        } 
      }


       export const authAdminMostViewBlog = async () => {
          try {
            const response = await axiosInstance.get(`/admin/blogs/views`)
            return response?.data
          } catch (error) {
              console.error("blog error:", error.response?.data || error.message);
              throw error
          } 
        }


        export const authAdminLogOut = async () => {
            try {
              const response = await axiosInstance.post(`/admin/log-out`)
              return response?.data
            } catch (error) {
                console.error("blog error:", error.response?.data || error.message);
                throw error
            } 
          }


          
    export const authAdminUserCreate = async (data) => {

        try {
            const response = await axiosInstance.post('/admin/user/create',{
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


      export const authAdminCreateBlog = async (formData) => {
        try {
            console.log([...formData])
          const response = await axiosInstance.post(`/admin/blog/create`,formData,{
    
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