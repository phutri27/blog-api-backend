import express from "express"
import { Request, Response, NextFunction } from "express"
import passport from "passport"
import "dotenv/config"
import routes from "./routes/index.js"
import "dotenv/config"
import { jwtSub } from "./utils/jwt.js"
import { isLogged, isAdmin } from "./utils/isAuth.js"
import cors from "cors"
passport.use(jwtSub)

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())  

app.use("/", isLogged, routes.defaultRoute)
app.use("/login", isLogged, routes.login)
app.use("/signup", isLogged, routes.signup)
app.use("/home", passport.authenticate('jwt', {session: false}), routes.home)
app.use("/comments", passport.authenticate('jwt', {session: false}), routes.comments)
app.use("/posts", passport.authenticate('jwt', {session: false}), isAdmin, routes.posts)
app.use("/profile", passport.authenticate('jwt', {session: false}), routes.profile)

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
