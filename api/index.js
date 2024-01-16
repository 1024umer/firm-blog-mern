import express from 'express'
import dotenv  from 'dotenv'
import mongoose from 'mongoose';
import colors from 'colors'
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;


const connectDB = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${conn.connection.host}`.green.bold.underline);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit with an error code
    }
};
connectDB()
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold.underline)
})