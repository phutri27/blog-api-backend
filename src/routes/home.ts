import express from "express"
import { renderPosts } from "../controller/postController"
const router = express.Router()

router.get("/", renderPosts)

export default router
