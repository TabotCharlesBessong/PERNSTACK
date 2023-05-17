
require('dotenv').config()
const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const passport = require('passport')
const logger = require('morgan')
const exp = require('constants')

// pass the session to the connect sqlite3 module
// allowing it to inherit from session.Store
const SQLiteStore = require('connect-sqlite3')(session)

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

// view engine setup
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.locals.pluralize = require('pluralize')

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(csrf());
app.use(passport.authenticate('session'));
app.use((req, res, next) => {
  const msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);

// app
const app = express()
const port = process.env.PORT

app.listen(port, ()=> {
  console.log(`Server is running on port number ${port}...`)
})