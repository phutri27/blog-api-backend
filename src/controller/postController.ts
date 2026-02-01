import { Request, Response } from "express";
import { matchedData, validationResult, Result } from "express-validator";
import { blogObj } from "../queries/queries.js";
import { validateBlogPublish } from "./validator/validator.js";

export const renderPosts = async (req: Request, res: Response) => {
    const posts = await blogObj.findAllPost(true)
    return res.status(200).json(posts) 
}

export const renderMyPost = async (req: Request, res: Response) => {
    if (!req.user){
        throw new Error("Unauthorized")
    }
    const posts = await blogObj.findAllPost(undefined,req.user.id)
    return res.status(200).json(posts)
}

export const blogPost = [
    ...validateBlogPublish,
    async (req: Request , res: Response ) => {
        const errors: Result = validationResult(req)
        if (!errors.isEmpty()){
            const result: Result<string> = errors.formatWith(error => error.msg as string)
            return res.status(400).json({errors: result.array()})
        }
        const {title, content} = matchedData(req)
        const {published} = req.body
        if (req.method == 'PUT'){
            const id = Number(req.params.id)
            await blogObj.editPost(id, title, content,published)
        } else {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" })
            }
             await blogObj.createPost(req.user.id, title, content, published)
        }
        return res.status(200).json({
            message: "Post created",
        })
    }
]

export const deletePost = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await blogObj.deletePost(id)
    return res.status(200).json({
        message: "Delete post successfully"
    })
}

