import { Response, Request } from "express"
import { userObj } from "../queries/queries"
import "dotenv/config"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const loginPost = async (req: Request, res: Response) => {
    const {email, password} = req.body

    const user = await userObj.findUserByEmail(email)
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const opts = {
                expiresIn: 60 * 60 * 24,
            }
            const secret = process.env.SECRET_KEY as string
            const token = jwt.sign({sub: user.id}, secret, opts)
            return res.status(200).json({
                message: "Authenticated",
                token,
                userId: user.id
            })
        }
    }
    return res.status(401).json({message: "Auth Failed"})
} 