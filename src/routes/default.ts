import express from 'express'
import { renderPosts } from '../controller/postController.js'

const router = express.Router()

router.get("/", renderPosts)

export default router