import express from "express"
import { loginPost } from "../controller/loginController"

const router = express.Router()

router.post("/login", loginPost)

export default router