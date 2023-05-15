const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const bcrpt = require("bcryptjs");

const signup = async (req,res)=>{
    const{username,dob,email,password,country,state,city}=req.body;
    try{
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrpt.hashSync(password,10)
        const result = await userModel.create({
            username:username,
            dob:dob,
            email:email,
            password:hashedPassword,
            country:country,
            state:state,
            city:city
        });
        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        res.status(201).json({user:result,token:token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const signin = async (req,res)=>{
    const{email,password}=req.body;
    try{
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }

        const matchPassword = await bcrpt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(200).json({user:existingUser,token:token});
    } catch (error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports={signup,signin}