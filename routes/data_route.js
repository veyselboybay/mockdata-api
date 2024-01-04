const router = require('express').Router()
const { dataController } = require('../controllers/data_controller')
const { rateLimiter } = require('../middlewares/ratelimit')



router.post("/data", (req, res) => {
    try {
        return res.status(403).json({success:false,msg:'Please provide your api key!'})
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
})
router.get("/data", (req, res) => {
    try {
        return res.status(400).json({success:false,msg:'You have to send a POST request along with your api key!'})
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
})
router.get("/data/:apiKey", (req, res) => {
    try {
        return res.status(400).json({success:false,msg:'You have to send a POST request not GET request!'})
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
})
router.post('/data/:apiKey',rateLimiter, dataController)


module.exports = router;