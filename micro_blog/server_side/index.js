const express = require('express')
require('dotenv').config()
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const indexRouter = require('./routes/indexRouter')
const authRouter = require('./routes/authRouter')


const port = process.env.PORT
const app = express()

// middlewares
app.use(cors({
  credentials:true,
  origin:process.env.CLIENT_URL
}))

app.use(session({
  secret:process.env.COOKIE_SECRET,
  cookie:{
    secure:process.env.NODE_ENV === 'production' ? 'true' : 'auto',
    sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  resave:false,
  saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session)

// routes
app.use('/',indexRouter)
app.use('/auth',authRouter)

app.listen(port, ()=> {
  console.log(`Server is running on port number ${port}...`)
})