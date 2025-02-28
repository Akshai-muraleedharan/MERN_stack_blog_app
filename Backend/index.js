    
    import express from "express"
    import v1Router from "./routes/index.js"
    import dbConnect from "./config/db.js"


    const app = express()
    
    const port = process.env.PORT || 4000
    
    //  connect db
    dbConnect()
    
    app.use('/api',v1Router)
    


    app.listen(port,() => {
        console.log(`server connected on port ${port}`)
    })