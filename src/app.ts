import express from "express"
import path from "node:path"
import { Request, Response, NextFunction } from "express"
import passport from "passport"
import "dotenv/config"
import routes from "./routes/index"
import "dotenv/config"
import { jwtSub } from "./utils/jwt"

passport.use(jwtSub)

const app = express()
const assetsPath = path.join(__dirname, "public")
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())  


app.use((req: Request , res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use("/", routes.login)
app.use("/signup", routes.signup)
app.use("/home", passport.authenticate('jwt', {session: false}), routes.home)

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
