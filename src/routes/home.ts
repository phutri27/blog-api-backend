import express from "express"
import { renderHomePage, blogPost } from "../controller/homeController"

const router = express.Router()

router.get("/", renderHomePage)
router.post("/blog", blogPost)

export default router
