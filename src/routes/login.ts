import express from "express"
import { loginPost, loginPostAdmin } from "../controller/loginController"

const router = express.Router()

router.post("/", loginPost)
router.post("/admin", loginPostAdmin)

export default router