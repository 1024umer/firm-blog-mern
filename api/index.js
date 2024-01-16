import express from 'express'
import connectDB from './config/db'
connectDB()
const app = express();
import dotenv  from 'dotenv'
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})