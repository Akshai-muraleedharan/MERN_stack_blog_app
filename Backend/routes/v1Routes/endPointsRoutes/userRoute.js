import express from "express"
import { configTest, GoogleAuth, userLogin, userLogOut, userProfile, userProfileUpdate, UserRegister } from "../../../controller/user/userController.js"
import { checkUser } from "../../../middleware/userAuth.js"

const userRoute = express.Router()


 userRoute.post('/register',UserRegister)
 userRoute.post('/login',userLogin)
 userRoute.post('/google',GoogleAuth)
 userRoute.get('/profile',checkUser,userProfile)
 userRoute.put('/profile/update',checkUser,userProfileUpdate)
 userRoute.post('/logout',checkUser,userLogOut)


 userRoute.post('/test',configTest)
 

 export default userRoute