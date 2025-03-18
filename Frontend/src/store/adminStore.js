import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"

 const useAdminAuthStore = create(
    devtools(persist((set) => ({
        admin:null,
        isAuthenticated : false,
        isLoading : false,
        authLoading : true,
        setadmin : (admin) => set({admin,isAuthenticated:true,isLoading:false}),
        setLoading : (loading) => set({isLoading:loading}),
        SetAdminNoToken :(admin) => set({admin,isAuthenticated:false,isLoading:false})
    }),
    {
        name:"admin-data",
        getStorage: () => localStorage,
    }

 ), {name : "admin"}))


 export default useAdminAuthStore