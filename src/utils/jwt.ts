import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions} from "passport-jwt"
import { userObj } from "../queries/queries"
import "dotenv/config"

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY as string,
}

export const jwtSub = new JwtStrategy(opts, async (jwt_payload, done) => {
    try{
        const user = await userObj.findUserById(jwt_payload.sub)
        if (!user){
            return done(null, false)
        }
        return done(null, user)
    } catch(err){
        return done(err, false)
    }
})
