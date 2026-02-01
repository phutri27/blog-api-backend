import express from "express"
import { selfComments } from "../controller/commentController.js"
const router = express.Router()

router.get('/', selfComments)

export default router