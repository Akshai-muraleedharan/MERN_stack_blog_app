import express from "express"
import userRoute from "./endPointsRoutes/userRoute.js"
import blogRoute from "./endPointsRoutes/blogRoute.js"
import adminRoute from "./endPointsRoutes/adminRoutes.js"

const routers = express.Router()

routers.use('/user',userRoute)
routers.use('/blog',blogRoute)
routers.use('/admin',adminRoute)

export default routers 