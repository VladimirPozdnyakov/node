import JwtStrategy from "passport-jwt";
import User from "../models/user";
import logger from "../logger";
import "dotenv/config.js";

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies("jwt");
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretKey: "process.env.JWTTOKENSECRET",
};

function passportFunction(passport) {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      User.findByEmail(jwt_payload.name, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          logger.info(null, "Что-то да не произошло");
          return done(null, user);
        } else {
          logger.info("Что-то да не произошло");
          return done(null, false);
        }
      });
    })
  );
}
export default passportFunction;
