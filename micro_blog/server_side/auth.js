
const passport = require('passport')
const {Strategy : GoogleStrategy} = require('passport-google-oauth20')
require('dotenv').config()

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.GOOGLE_CALLBACK_URL
}, (_,__,profile,done) => {
  const account = profile._json
  console.log(account)
}))