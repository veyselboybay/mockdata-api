const router = require('express').Router()
const { playgroundController } = require('../controllers/data_controller')
const { authMiddleware } = require('../middlewares/auth_middleware')
const {rateLimiterPlayground} = require('../middlewares/ratelimit')

router.post('/:apiKey',[authMiddleware,rateLimiterPlayground],playgroundController)

module.exports = router;