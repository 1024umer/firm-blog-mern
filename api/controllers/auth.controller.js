import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
export const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password && username == '' || email == '' || password == ''){
        res.status(404)
        res.send('All fields are required')
    }
    const hashedPassword = bcrypt.hashSync(password,10)
    const user = await User.create({username,email,password:hashedPassword})
    if(user){
        res.status(200).send({user})
    }else{
        res.status(404)
        throw new Error('There is some error')
    }
}