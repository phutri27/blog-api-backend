import express from "express"
import { renderComments, createComments } from "../controller/commentController"
const router = express.Router()

router.get("/:id", renderComments)
router.post("/:userId/:postId", createComments)
router.put("/:id", createComments)
router.delete("/:id",)

export default router