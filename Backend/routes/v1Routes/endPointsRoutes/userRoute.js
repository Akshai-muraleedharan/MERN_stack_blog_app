import express from "express"
import { UserRegister } from "../../../controller/user/userController.js"

const userRoute = express.Router()


 userRoute.post('/register',UserRegister)


 export default userRoute