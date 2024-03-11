import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.js";
import logger from "../logger/index.js";
import "dotenv/config.js";

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWTTOKENSECRET,
};

function passportFunctionJWT(passport) {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      User.findByEmail(jwt_payload.name, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          logger.info(null, "Что-то да произошло");
          return done(null, user);
        } else {
          logger.info("Что-то да не произошло");
          return done(null, false);
        }
      });
    })
  );
}

export default passportFunctionJWT;
