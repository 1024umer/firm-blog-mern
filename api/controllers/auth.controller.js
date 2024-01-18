import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password && username == '' || email == '' || password == '') {
    next(errorHandler(400, 'All fields are required'));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword })
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
}
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(400, 'User not found'));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const { password: pass, ...rest } = validUser._doc
    res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
  } catch (error) {
    errorHandler('Internal Server Error', 500)
  }
}
export const google = async (req,res,next)=>{
  const {name,email,googlePhotoURl} = req.body;
  try {
    const user = await User.findOne({email});
    if(user){
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const { password, ...rest } = user._doc
    res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
    }else{
      const generatedPasword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPasword,10)
      const user = await User.create({ 
        username:name.toLowerCase().split(' ') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture:googlePhotoURl 
      })
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      const { password:pass, ...rest } = user._doc
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
    }
  } catch (error) {
    next(error);
  }
}