const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRouter = require('./routes/auth_route')

const app = express()

const PORT = process.env.PORT || 3000;

// app middlewares
app.use(cors())
app.use(express.json())

app.use('/api/v1', authRouter)


// listen
app.listen(PORT, () => {
    console.log(`app listening port:${PORT}`)
})