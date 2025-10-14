import User from "../models/user.model.js";
import STATUS_CODES from "../lib/statusCodes.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";


export const signUp = async (req,res)=>{

    const {email,fullname,password} = req.body
    try {
        if(!email||!fullname||!password) return res.status(STATUS_CODES.BAD_REQUEST).json({message:"all fields are required"})
        if(password.length<6){
            return res.status(STATUS_CODES.BAD_REQUEST).json({message:"Password should have minimum 6 characters"})
        }

        const user = await User.findOne({email})
        if(user) return res.status(STATUS_CODES.BAD_REQUEST).json({message:"User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullname:fullname,
            email:email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res)

            await newUser.save()

            res.status(STATUS_CODES.CREATED).json(newUser)
        }else{
            res.status(STATUS_CODES.BAD_REQUEST).json({message:"Invalid User Data"})
        }

    } catch (error) {
        console.log("Signup error " + error.message)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"internal server error"})
    }

}

export const login = async (req,res)=>{

    const {email,password} = req.body
    try {
          const user = await User.findOne({email})
          if(!user) return res.status(STATUS_CODES.BAD_GATEWAY).json({message:"user doesnt exist"})

          const isPassword = await bcrypt.compare(password,user.password)

          if(!isPassword) return res.status(STATUS_CODES.BAD_REQUEST).json({message:"Wrong password"})

          generateToken(user._id,res)

          res.status(STATUS_CODES.OK).json(user)

    } catch (error) {
        console.log("login error " + error.message)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"internal server error"})
    }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // instantly expires the token
    res.status(STATUS_CODES.OK).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req,res)=>{
    try {
        res.status(STATUS_CODES.OK).json(req.user)
    } catch (error) {

        console.log("Error in CheckAuth ",error.message)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
    }
}
