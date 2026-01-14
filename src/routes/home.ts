import express from "express"
import { renderHomePage, blogPost, renderComments } from "../controller/homeController"

const router = express.Router()

router.get("/", renderHomePage)
router.post("/blog", blogPost)

router.get("/posts/:id", renderComments)

export default router
