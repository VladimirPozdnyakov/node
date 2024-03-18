import { Strategy as GitHubStrategy } from "passport-github2";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionGithub(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    newUser.id = user.id;
    newUser.email = email();
    newUser.name = user.displayName;
    done(null, newUser);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          // To keep the example simple, the user's GitHub profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the GitHub account with a user record in your
          // database, and return that user instead.
          logger.info("Получили профиль от GitHub");
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionGithub;
