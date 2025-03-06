import express from "express"
import userRoute from "./endPointsRoutes/userRoute.js"
import blogRoute from "./endPointsRoutes/blogRoute.js"

const routers = express.Router()

routers.use('/user',userRoute)
routers.use('/blog',blogRoute)

export default routers 