import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { blogObj } from "../queries/queries";
import { validateBlogPublish } from "./validator/validator";

export const renderHomePage = async (req: Request, res: Response) => {
    if (!req.user){
        throw new Error("Unauthorized")
    }
    const posts = await blogObj.findAllPost()
    return res.status(200).json(posts) 
}

export const blogPost = [
    ...validateBlogPublish,
    async (req: Request , res: Response ) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {title, content, published} = matchedData(req)
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        await blogObj.createPost(req.user.id, title, content, published)
        return res.status(200).json({
            message: "Post created"
        })
    }
]

