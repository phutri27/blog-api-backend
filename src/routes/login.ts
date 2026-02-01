import express from "express"
import { loginPost, loginPostAdmin } from "../controller/loginController.js"

const router = express.Router()

router.post("/", loginPost)
router.post("/admin", loginPostAdmin)

export default router