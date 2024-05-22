import { Strategy as VKStrategy } from "passport-vkontakte";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionVK(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    newUser.id = user.id;
    newUser.email = user.emails[0].value;
    newUser.name = user.displayName;
    newUser.age = user.birthday ? date.now() - user.birthday : 0;
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new VKStrategy(
      {
        clientID: process.env.VK_APP_ID,
        clientSecret: process.env.VK_APP_SECRET,
        callbackURL: "http://localhost:80/auth/vkontakte/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          logger.info(`Получили профиль от ВК ${profile}`);
          return done(null, profile);
        });
      }
    )
  );
}

export default passportFunctionVK;
