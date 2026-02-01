import express from "express";
import { signUpPost } from "../controller/signupController";
const router = express.Router();
router.post("/", signUpPost);
export default router;
//# sourceMappingURL=signup.js.map