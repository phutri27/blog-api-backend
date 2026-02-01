import { matchedData, validationResult } from "express-validator";
import { commnentObj } from "../queries/queries";
import { validateComments } from "./validator/validator";
export const renderComments = async (req, res) => {
    const id = Number(req.params.id);
    const comments = await commnentObj.findAllComments(id);
    return res.status(200).json(comments);
};
export const createComments = [...validateComments,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const result = errors.formatWith(error => error.msg);
            return res.status(400).json({ errors: result.array() });
        }
        const { content } = matchedData(req);
        const { userId } = req.body;
        let result;
        if (req.method == 'POST') {
            const postId = Number(req.params.postId);
            const userId = Number(req.user?.id);
            result = await commnentObj.createComments(postId, userId, content);
        }
        else {
            if (req.user?.id != userId) {
                return res.status(400).json("Unauthorized for this action");
            }
            const cmtId = Number(req.params.id);
            result = await commnentObj.updateComments(cmtId, content);
        }
        return res.status(200).json(result);
    }
];
export const selfComments = async (req, res) => {
    const userId = Number(req.user?.id);
    const result = await commnentObj.findSelfComments(userId);
    return res.status(200).json(result);
};
export const deleteComments = async (req, res) => {
    const id = Number(req.params.id);
    const { userId } = req.body;
    if (req.user?.id != userId) {
        return res.status(400).json("Unathorized for this action");
    }
    const result = await commnentObj.deleteComments(id);
    return res.status(200).json(result);
};
//# sourceMappingURL=commentController.js.map