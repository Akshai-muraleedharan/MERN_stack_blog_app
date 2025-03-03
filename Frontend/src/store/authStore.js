import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"

 const useAuthStore = create(
    devtools(persist((set) => ({
        user:null,
        isAuthenticated : false,
        isLoading : false,

        setUser : (user) => set({user,isAuthenticated:true,isLoading:false}),
        setLoading : (loading) => set({isLoading:loading}),
        setUserAuth :(user) => set({user,isAuthenticated:false,isLoading:false})
    }),
    {
        name:"user-data",
        getStorage: () => localStorage,
    }

 ), {name : "user"}))


 export default useAuthStore