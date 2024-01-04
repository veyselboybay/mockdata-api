const { registerSchema, loginSchema } = require('../validations/validation')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    // user data validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });
    // check if the user exists
    const isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) return res.status(400).json({ success: false, msg: "User already exists" })

    try {
        const newUser = await UserModel.create({
            ...req.body
        })
        return res.status(201).json({success:true, msg:'New User is Created'})
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
}

const login = async (req, res) => {
    // user validation
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, msg: error.details[0].message });

    try {
        // check if the user exists
        const isUser = await UserModel.findOne({ email: req.body.email })
        if (!isUser) return res.status(401).json({ success: false, msg: "Wrong credentials or user does not exist" })        

        // check password
        const isValidPassword = await bcrypt.compare(req.body.password, isUser.password)
        if (!isValidPassword) {
            return res.status(401).json({success:false,msg:'Invalid email or password'})
        }

        const token = await jwt.sign({ userId: isUser._id }, process.env.SECRET, { expiresIn: '7d' });
        return res.status(200).json({success:true,token:token,msg:'Logged In!', apiKey: isUser.apiKey, email: isUser.email})

    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
}


module.exports = {register,login}