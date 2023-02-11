const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Customer = require("../model/Customer");
const { createToken } = require('./authCusController');


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, cb) {
            // Perform user authentication here
            Customer.findOne({ email: profile.emails[0].value }, function (err, user) {
                if (err) { return cb(err); }
                if (!user) {
                    // Save the new user to the database
                    const newUser = new Customer({ name: profile.displayName, email: profile.emails[0].value });
                    newUser.save(function (err) {
                        if (err) { return cb(err); }

                        return cb(null, { profile: profile, authUser: newUser });
                    });
                } else {
                    // User already exists
                    return cb(null, {profile: profile, authUser: user});
                }
            });
        }
    ));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;