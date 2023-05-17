
const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
  database:process.env.DATABASE_NAME,
  port:process.env.DATABASE_PORT,
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD
})

module.exports = pool

// Dear Hiring Manager,

// I am writing to express my interest in the frontend developer intern position at your company. I have worked with HTML CSS and JavaScript for more than 2 years now. I have done bootstrap in the past and now work mostly with tailwind CSS. I learned a lot about JavaScript as i brake frontiers by now learning React JS and Node JS. I have worked on React based projects and applications for almost 2 years now increasing my knowledge of JavaScript and understanding of html and css. I have worked with it on many personal project and presently using it in a team project. I also have solid understanding of React JS and its hooks. I started learning typescript earlier this year after and I have worked on some react and next JS typescript based projects. I am also familiar with basic react native syntax as I am presently learning the mobile technology. In addition to my technical skills, I also have good communication and collaboration skills. I have worked in agile teams using tools like Git, GitHub, Slack, and Jira. I am always eager to learn new technologies and improve my code quality. I value feedback and constructive criticism and strive to deliver high-quality work that meets the client's expectations.

// I am very excited about the opportunity to work at your company and join your talented team of frontend developers.



// Sincerely,Tabot Charles Bessong





// Dear Hiring Manager,

// I am writing to express my interest in the frontend developer intern position at your company. I have worked with HTML CSS and JavaScript for more than 2 years now. I learned a lot about JavaScript as i brake frontiers by now learning React JS and Node JS. I have worked on React based projects and applications for almost 2 years now increasing my knowledge of JavaScript and understanding of html and css. I have worked with it on many personal project and presently using it in a team project. I also have solid understanding of React JS and its hooks. I started learning typescript,Next JS earlier this year. In the process, I have worked on some react and next JS typescript based projects. In addition to my technical skills, I also have good communication and collaboration skills and I always have an open mindset to learning newthings everyday. Presently learning . I have worked in agile teams using tools like Git, GitHub, Slack, and Jira. I am always eager to learn new technologies and improve my code quality. I value feedback and constructive criticism and strive to deliver high-quality work that meets the client's expectations.

// I am very excited about the opportunity to work at your company and join your talented team of frontend developers.



// Sincerely,Tabot Charles Bessong





# index.js
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const indexRouter = require('./routes/indexRouter')
const authRouter = require('./routes/authRouter')
require('./auth')


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