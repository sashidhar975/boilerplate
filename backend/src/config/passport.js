const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, callback) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value 
                });
                await user.save();
            }

            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    }, async (accessToken, refreshToken, profile, callback) => {
        try {
            let user = await User.findOne({ facebookId: profile.id });

            if (!user) {
                user = new User({
                    facebookId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : null 
                });
                await user.save();
            }

            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
