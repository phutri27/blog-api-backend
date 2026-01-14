import express from "express"
import { renderPosts, blogPost, deletePost } from "../controller/postController"
const router = express.Router()

router.get("/:id", renderPosts)
router.post("/", blogPost)
router.put("/post/:id", blogPost)
router.delete("/post/:id", deletePost)

export default router