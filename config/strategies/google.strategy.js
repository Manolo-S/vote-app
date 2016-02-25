var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function () {
    passport.use(new GoogleStrategy({
            clientID: '238028802445-233baqsfber7363ubbs9nlv5j5qtter6.apps.googleusercontent.com',
            clientSecret: '3ecF4hE3IFs0oLdpEsDcSJr9',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function (req, accessToken, refreshToken, profile, done) {
            var user = {};
        
            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;
        
            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;
            
            done(null, user);
        }
    ));


};