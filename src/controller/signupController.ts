import { matchedData, validationResult, Result } from "express-validator";
import { userObj } from "../queries/queries.js";
import { Request, Response } from "express";
import { createHash } from "../utils/utility.js";
import { validateSignUp } from "./validator/validator.js";
import { PrismaClient, Prisma } from '../../generated/prisma/client.js'

export const signUpPost = [...validateSignUp, async (req: Request, res: Response) => {
    const errors: Result = validationResult(req)
    if (!errors.isEmpty()){
        const result: Result<string> = errors.formatWith(error => error.msg as string)
        return res.status(400).json({errors: result.array()})
    }
    const {email, password} = matchedData(req)
    const hashedPassword = await createHash(password)
    try{
        await userObj.createUser(email, hashedPassword)
    } catch(e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
            return res.status(401).json({errors: ["Email has been taken"]})
        }
  }
    }
    return res.status(200).json({
        email: email,
        message: "Account created succesfully"
    })
}]




