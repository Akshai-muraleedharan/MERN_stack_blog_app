import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"

 const useBlogStore = create(
    devtools(persist((set) => ({
        content:"",
        

        setSanitized : (content) => set(content),
       
    }),
    {
        name:"blog-data",
        getStorage: () => localStorage,
    }

 ), {name : "blog"}))


 export default useBlogStore