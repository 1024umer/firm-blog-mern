import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password && username == '' || email == '' || password == ''){
        next(errorHandler(400, 'All fields are required'));
    }
    const hashedPassword = bcrypt.hashSync(password,10);
    try {
        const user = await User.create({username,email,password:hashedPassword})
        res.json('Signup successful');
      } catch (error) {
        next(error);
      }
}