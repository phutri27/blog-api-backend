import { body } from "express-validator";

const emptyMsg = "must not be empty"

export const validateSignUp = [
    body("email").trim()
    .notEmpty().withMessage(`Email ${emptyMsg}`)
    .isEmail().withMessage('Wrong format email'),

    body("password").trim()
    .notEmpty().withMessage(`Password ${emptyMsg}`)
    .isLength({min: 8}).withMessage("Password must be at least 8 character")
    .isLength({max: 25}).withMessage("Password must not exceed 25 characters"),

    body("confirmPass").trim()
    .notEmpty().withMessage(`Password ${emptyMsg}`)
    .custom((value: string, {req}) => {
        if(value !== req.body.password){
            return Promise.reject("Password does not match")
        }
        return true
    })
]

export const validateBlogPublish = [
    body("title").trim()
    .notEmpty().withMessage(`Title ${emptyMsg}`)
    .isLength({max: 255}).withMessage(`Title must not exceed 255 character`),

    body("content").trim()
    .notEmpty().withMessage(`Blog content ${emptyMsg}`)
]

export const validateComments = [
    body("content").trim()
    .notEmpty().withMessage(`Comment content ${emptyMsg}`)
]