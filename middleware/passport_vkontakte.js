import { Strategy as VKontakteStrategy } from "passport-vkontakte";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionVKontakte(passport) {
  passport.use(
    new VKontakteStrategy(
      {
        clientID: process.env.VK_APP_ID,
        clientSecret: process.env.VK_APP_SECRET,
        callbackURL: "http://localhost/auth/vkontakte/callback",
      },
      function (accessToken, refreshToken, params, profile, doneVK) {
        process.nextTick(function () {
          logger.info(`Получили профиль от VK ${profile}`);
          return doneVK(null, profile);
        });
      }
    )
  );
}

export default passportFunctionVKontakte;
