const passport = require('passport')
const express = require('express')

const router = express.Router()

router.get('/',(req,res) => {
  res.send('auth')
})

router.get('/google',passport.authenticate("google",{
  scope:'profile'
}))

module.exports = router