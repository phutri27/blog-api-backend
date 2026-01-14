import express from "express"
import passport from "passport"
import { loginPost } from "../controller/loginController"

const router = express.Router()

// router.get("/")
// router.get("/login")
router.post("/login", loginPost)

export default router