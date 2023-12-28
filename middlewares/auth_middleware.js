const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const authMiddleware = async (req, res, next) => {
    let token;
    try {
        token = req.headers.authorization;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET);
                const user = await UserModel.findById(decoded.userId).select('-password');
                if (user) {
                    req.user = user;
                    next()
                }
            } catch (error) {
                return res.status(401).json({success:false, msg:'Not Authorized, Invalid Token!'})
            }
        } else {
            return res.status(401).json({success:false, msg:'Not Authorized, No Token!'})
        }
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

module.exports = {authMiddleware};