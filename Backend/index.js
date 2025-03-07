    
    import express from "express"
    import v1Router from "./routes/index.js"
    import dbConnect from "./config/db.js"
    import cookieParser from "cookie-parser"
    import cors from "cors"
    import helmet from "helmet"

    const app = express()


    const corsOption = {
        origin:"http://localhost:5173",
        credentials:true
    }

    app.use(helmet())
    app.use(express.json())
    app.use(cookieParser())
    app.use(cors(corsOption))

    const port = process.env.PORT || 4000
    
    //  connect db
    dbConnect()

    app.get('/', (req,res) => {
        res.send("Success")
    })
    
    app.use('/api',v1Router)
    


    app.listen(port,() => {
        console.log(`server connected on port ${port}`)
    })