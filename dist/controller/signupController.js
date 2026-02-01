import { matchedData, validationResult } from "express-validator";
import { userObj } from "../queries/queries";
import { createHash } from "../utils/utility";
import { validateSignUp } from "./validator/validator";
import { Prisma } from '../../generated/prisma/client';
export const signUpPost = [...validateSignUp, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const result = errors.formatWith(error => error.msg);
            return res.status(400).json({ errors: result.array() });
        }
        const { email, password } = matchedData(req);
        const hashedPassword = await createHash(password);
        try {
            await userObj.createUser(email, hashedPassword);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === 'P2002') {
                    return res.status(401).json({ errors: ["Email has been taken"] });
                }
            }
        }
        return res.status(200).json({
            email: email,
            message: "Account created succesfully"
        });
    }];
//# sourceMappingURL=signupController.js.map