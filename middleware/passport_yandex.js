import { Strategy as YandexStrategy } from "passport-yandex";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionYandex(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    newUser.id = user.id;
    newUser.email = user.emails[0].value;
    newUser.name = user.displayName;
    newUser.age = user.birthday ? Date.now() - user.birthday : 0;
    newUser.author = user.displayName;
    done(null, newUser);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new YandexStrategy(
      {
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:80/auth/yandex/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          // To keep the example simple, the user's Yandex profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the Yandex account with a user record in your
          // database, and return that user instead.
          logger.info("Получили профиль от Яндекса");
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionYandex;
