export function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    next();
}
export function isLogged(req, res, next) {
    if (req.user) {
        return res.status(403).json({
            message: "Already authenticated"
        });
    }
    next();
}
//# sourceMappingURL=isAuth.js.map