    
    import express from "express"
    import v1Router from "./routes/index.js"
    import dbConnect from "./config/db.js"
    import cookieParser from "cookie-parser"
    import cors from "cors"
    import helmet from "helmet"
    import rateLimiter from "express-rate-limit"
    import compression from 'compression'
    const app = express()
 

    const corsOption = {
        origin:  process.env.FRONTENDURL,
        //  origin:  "http://localhost:5173",
        credentials:true
    } 

    const limiter = rateLimiter({
        windowMs: 15 * 60 * 1000,
        limit:100,
        message:"Too many request from this Ip Please again Later 15 minutes"
    })

    app.use(helmet());
    app.use(express.json({limit:5000000}));
    app.use(cookieParser());
    app.use(cors(corsOption));
    app.use(limiter);
    app.use(compression())
    

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