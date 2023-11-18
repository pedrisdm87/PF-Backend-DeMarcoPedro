export const publicRoutes = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
    next()
}
export const privateRoutes = (req, res, next) => {
    if (!req.session.user) return res.status(401).send('Not authorized, you must register first');
    next();
}

export const handlePolices = policies => (req, res, next) => {
    if (policies.includes('PUBLIC')) return next()
    if (!req.session.user) return res.status(401).json({ status: 'error', error: 'You must be registered!' })
    if (policies.length > 0) {
        if (!policies.includes(req.session.user.role.toUpperCase())) {
            return res.status(403).json({ status: 'error', error: 'Insufficient permissions!' })
        }
    }
    next()
} 