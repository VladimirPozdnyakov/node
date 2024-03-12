import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionGoogle(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    newUser.id = user.id;
    newUser.email = user.emails[0].email;
    newUser.name = user.displayName;
    newUser.age = user.birthday ? Date.now() - user.birthday : 0;
    done(null, newUser);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (request, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          // To keep the example simple, the user's Google profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the Google account with a user record in your
          // database, and return that user instead.
          logger.info("Получили профиль от Google");
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionGoogle;
