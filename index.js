const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
require('dotenv').config()
const authRouter = require('./routes/auth_route')
const dataRouter = require('./routes/data_route')
const playgroundRouter = require('./routes/playground_route')
const { authMiddleware } = require('./middlewares/auth_middleware')
const { rateLimiter,rateLimiterPlayground } = require('./middlewares/ratelimit')

const app = express()

const PORT = process.env.PORT || 3000;

let counter = 0;

// app middlewares
app.set('trust proxy', 1)
app.get('/ip', (req, res) => res.send(req.ip));
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use((req,res,next) => {
    counter = counter + 1;
    next()
});

app.get('/counter', (req, res) => {
    return res.json({counter:counter})
})

app.use('/api/v1', authRouter);
app.use('/api/v1', dataRouter);
app.use('/api/v1/playground', playgroundRouter);

// Health check
app.get('/healthz', (req, res) => {
    try {
        return res.status(200).json({"message": 'Healthy'});
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
})

// db connection
const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECTION).then(() => {
        console.log('DB connected...')
    }).catch(err => console.log(err));
}
connectDB();

try {
    // listen
    app.listen(PORT, () => {
    console.log(`app listening port:${PORT}`)
})
} catch (error) {
    return res.status(500).json({success:false,msg:error.message})
}