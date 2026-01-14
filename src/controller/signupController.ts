import { matchedData, validationResult } from "express-validator";
import { userObj } from "../queries/queries";
import { Request, Response } from "express";
import { createHash } from "../utils/utility";
import { validateSignUp } from "./validator/validator";

export const signUpPost = [...validateSignUp, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = matchedData(req)
    const hashedPassword = await createHash(password)
    await userObj.createUser(email, hashedPassword)
    return res.status(200).json({
        email: email,
        message: "Account created succesfully"
    })
}]




