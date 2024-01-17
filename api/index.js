import express from 'express'
import dotenv  from 'dotenv'
import mongoose from 'mongoose';
import colors from 'colors'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;


const connectDB = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${conn.connection.host}`.green.bold.underline);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
connectDB()
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold.underline)
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});