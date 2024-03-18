import { Strategy as GitHubStrategy } from "passport-github";
import logger from "../logger/index.js";
import "dotenv/config.js";

function passportFunctionGithub(passport) {
  passport.serializeUser(function (user, doneGT) {
    console.log(user);
    console.log("Github serialize");
    const email = function () {
      if (user.provider == "google") {
        return user.email;
      } else if (user.provider == "yandex") {
        return user.emails[0].value;
      } else if (user.provider == "github") {
        return user._json.displayName
          ? user._json.displayName
          : "github.email@gmail.com";
      } else {
        return "vk.email@gmail.com";
      }
    };
    const newUser = {
      id: user.id,
      username: user.displayName,
      email: email(),
    };
    return doneGT(null, newUser);
  });
  passport.deserializeUser(function (id, doneVK) {
    return doneVK(null, id);
  });
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:80/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, doneGT) {
        return doneGT(null, profile);
      }
    )
  );
}

export default passportFunctionGithub;
