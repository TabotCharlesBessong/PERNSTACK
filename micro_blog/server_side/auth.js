
const passport = require('passport')
const {Strategy : GoogleStrategy} = require('passport-google-oauth20')
require('dotenv').config()

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.GOOGLE_CALLBACK_URL
}, (accessToken,refreshToken)))