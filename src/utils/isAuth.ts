import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    if (req.user.role !== 'ADMIN'){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    next()
}

export function isLogged(req: Request, res: Response, next: NextFunction) {
    if (req.user){
        return res.status(403).json({
            message: "Already authenticated"
        })
    }
    next()
}
