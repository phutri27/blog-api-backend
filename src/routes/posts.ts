import express from "express"
import { renderMyPost, blogPost, deletePost } from "../controller/postController.js"

const router = express.Router()

router.get("/", renderMyPost)
router.post("/", blogPost)
router.put("/post/:id", blogPost)
router.delete("/post/:id", deletePost)

export default router