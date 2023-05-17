
require('dotenv').config()
const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const passport = require('passport')
const logger = require('morgan')
const exp = require('constants')



// app
const app = express()
const port = process.env.PORT

app.listen(port, ()=> {
  console.log(`Server is running on port number ${port}...`)
})