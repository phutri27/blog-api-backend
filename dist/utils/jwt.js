import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { userObj } from "../queries/queries";
import "dotenv/config";
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};
export const jwtSub = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userObj.findUserById(jwt_payload.sub);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
});
//# sourceMappingURL=jwt.js.map