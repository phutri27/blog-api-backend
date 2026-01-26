import { Request, Response } from "express";
import { matchedData, validationResult, Result } from "express-validator";
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
        const errors: Result = validationResult(req)
        if (!errors.isEmpty()){
            const result: Result<string> = errors.formatWith(error => error.msg as string)
            return res.status(400).json({errors: result.array()})
        }
        const {content} = matchedData(req)
        let result
        if (req.method == 'POST'){
            const postId = Number(req.params.postId)
            const userId = Number(req.user?.id)
            const result = await commnentObj.createComments(postId, userId, content)
        } else{
            const cmtId = Number(req.params.id)
            result =await commnentObj.updateComments(cmtId, content)
        }
        return res.status(200).json(result)
    }
]

export const deleteComments = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await commnentObj.deleteComments(id)
    return res.status(200).json({
        message: "Delete comment successfully"
    })
}