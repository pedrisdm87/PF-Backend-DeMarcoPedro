export const publicRoutes = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
    next()
}
export const privateRoutes = (req, res, next) => {
    if (!req.session.user) return res.status(401).send('Not authorized, you must register first');
    next();
}
