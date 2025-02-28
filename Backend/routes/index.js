
    import express from 'express'
    import routers from './v1Routes/index.js'

    const v1Router = express.Router()

    v1Router.use('/v1',routers)

    export default v1Router