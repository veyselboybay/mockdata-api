const setRateLimit = require('express-rate-limit')

const rateLimiter = setRateLimit({
    windowMs: 24 *60 *60 *1000,
    // windowMs: 60 *1000,
    max: 5,
    message: `{success: false, msg: "You have exceeded your 5 request per min limit."}`,
    headers: true,
    handler: function (req, res,next) {
        return res.status(429).json({ success: false, msg: "You have exceeded your 5 request per day limit." })       
    }
})

module.exports = {rateLimiter}