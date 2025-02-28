import mongoose  from "mongoose"

const dbConnect = () => {
    try {
        const dbUrl = process.env.DBURL;
        mongoose.connect(dbUrl)
        console.log("mongodb connected successfully")    
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect