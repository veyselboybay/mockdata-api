const router = require('express').Router()


router.get('/', (req, res) => {
    res.json({"message":"works fine"})
})


module.exports = router;