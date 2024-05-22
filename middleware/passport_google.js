import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionGoogle(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    newUser.id = user.id;
    newUser.email = user.emails[0].email;
    newUser.name = user.displayName;
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
        callbackURL: "http://localhost:80/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          logger.info(`Получили профиль от Google ${profile}`);
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionGoogle;
