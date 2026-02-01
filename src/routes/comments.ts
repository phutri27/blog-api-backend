import express from "express"
import { renderComments, createComments, deleteComments } from "../controller/commentController.js"
const router = express.Router()

router.get("/:id", renderComments)

router.post("/:postId", createComments)
router.put("/:id", createComments)
router.delete("/:id", deleteComments)

export default router