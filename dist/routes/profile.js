import express from "express";
import { selfComments } from "../controller/commentController";
const router = express.Router();
router.get('/', selfComments);
export default router;
//# sourceMappingURL=profile.js.map