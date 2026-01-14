import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { commnentObj } from "../queries/queries";
import { validateComments } from "./validator/validator";
import { prisma } from "../../lib/prisma";

export const renderComments = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const comments = await commnentObj.findAllComments(id)
    return res.status(200).json(comments)
}

export const createComments = [...validateComments,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {content} = matchedData(req)
        if (req.method == 'POST'){
            const postId = Number(req.params.postId)
            const userId = Number(req.params.userId)
            await commnentObj.createComments(postId, userId, content)
        } else{
            const cmtId = Number(req.params.id)
            await commnentObj.updateComments(cmtId, content)
        }
        return res.status(200).json({
            message: "Create comment successfully"
        })
    }
]

export const deleteComments = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await commnentObj.deleteComments(id)
    return res.status(200).json({
        message: "Delete comment successfully"
    })
}