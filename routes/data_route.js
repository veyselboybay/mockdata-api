const router = require('express').Router()
const {dataController} = require('../controllers/data_controller')


router.post("/data", (req, res) => {
    try {
        return res.status(403).json({success:false,msg:'Please provide your api key!'})
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
})
router.post('/data/:apiKey', dataController)

module.exports = router;