const express   = require('express')
const mongoose  = require('mongoose')
const dotenv    = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

// run the app
const app   = express()
const port  = 5000
dotenv.config()

// connect to mongodb 
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connection Successfully!'))
    .catch(err => console.log(err))

// server listen
app.listen(process.env.PORT || port, () => {
    console.log(`Backend server running in port:${port}...`);
})

// routes
app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
