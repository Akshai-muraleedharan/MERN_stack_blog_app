import express from "express"
import { userLogin, userLogOut, userProfile, UserRegister } from "../../../controller/user/userController.js"
import { checkUser } from "../../../middleware/userAuth.js"

const userRoute = express.Router()


 userRoute.post('/register',UserRegister)
 userRoute.post('/login',userLogin)
 userRoute.get('/profile',checkUser,userProfile)
 userRoute.post('/logout',checkUser,userLogOut)


 export default userRoute