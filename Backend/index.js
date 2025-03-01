    
    import express from "express"
    import v1Router from "./routes/index.js"
    import dbConnect from "./config/db.js"
    import cookieParser from "cookie-parser"

    const app = express()
    

    app.use(express.json())
    app.use(cookieParser())

    const port = process.env.PORT || 4000
    
    //  connect db
    dbConnect()
    
    app.use('/api',v1Router)
    


    app.listen(port,() => {
        console.log(`server connected on port ${port}`)
    })