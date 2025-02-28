import express from "express"
import userRoute from "./endPointsRoutes/userRoute.js"

const routers = express.Router()

routers.use('/user',userRoute)

export default routers