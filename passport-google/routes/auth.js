const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const db = require('../db');


// Configure the Google strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
  // This line registers a new Google authentication strategy with Passport. The strategy takes three arguments:

  // clientID: The client ID for the Google application.
  // clientSecret: The client secret for the Google application.
  // callbackURL: The URL that Google will redirect to after the user authenticates.
  // The strategy also takes an optional scope argument, which specifies the permissions that the application is requesting from Google. In this case, the application is only requesting the profile scope, which allows the application to access the user's profile information.
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], (err, row) => {
    // This line gets a row from the `federated_credentials` table. The query selects all rows where the `provider` column matches the value of the `issuer` argument and the `subject` column matches the value of the `profile.id` property.
    if (err) { return cb(err); }
    if (!row) {
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], (err) => {
        if (err) { return cb(err); }
        const id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], (err) => {
          if (err) { return cb(err); }
          const user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
      // If no row is found, the following code is executed. The code first inserts a new row into the users table. The row contains the user's name, which is obtained from the profile.displayName property. The code then gets the last ID that was inserted into the users table. The code then inserts a new row into the federated_credentials table. The row contains the user's ID, the value of the issuer argument, and the value of the profile.id property. Finally, the code creates a new user object and passes it to the callback function. The callback function is responsible for logging the user in.
    } else {
      db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], (err, row) => {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false); }
        return cb(null, row);
      });
    }
    
  });
}));
  
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});


const router = express.Router();

/* GET /login
 *
 * This route prompts the user to log in.
 *
 * The 'login' view renders an HTML page, which contain a button prompting the
 * user to sign in with Google.  When the user clicks this button, a request
 * will be sent to the `GET /login/federated/accounts.google.com` route.
 */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* GET /login/federated/accounts.google.com
 *
 * This route redirects the user to Google, where they will authenticate.
 *
 * Signing in with Google is implemented using OAuth 2.0.  This route initiates
 * an OAuth 2.0 flow by redirecting the user to Google's identity server at
 * 'https://accounts.google.com'.  Once there, Google will authenticate the user
 * and obtain their consent to release identity information to this app.
 *
 * Once Google has completed their interaction with the user, the user will be
 * redirected back to the app at `GET /oauth2/redirect/accounts.google.com`.
 */
router.get('/login/federated/google', passport.authenticate('google'));

/*
    This route completes the authentication sequence when Google redirects the
    user back to the application.  When a new user signs in, a user account is
    automatically created and their Google account is linked.  When an existing
    user returns, they are signed in to their linked account.
*/
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));

/* POST /logout
 *
 * This route logs the user out.
 */
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
