import express from "express";
import { renderComments, createComments, deleteComments } from "../controller/commentController";
const router = express.Router();
router.get("/:id", renderComments);
router.post("/:postId", createComments);
router.put("/:id", createComments);
router.delete("/:id", deleteComments);
export default router;
//# sourceMappingURL=comments.js.map