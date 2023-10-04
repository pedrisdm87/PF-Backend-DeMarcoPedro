import { Router } from "express";
import UserModel from "../dao/models/user.model.js"

const router = Router()

router.post('/register', async (req, res) => {
    
    const newUser = req.body
    const user = new UserModel(newUser)
    await user.save()
    res.redirect('/')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({email, password}).lean().exec()
    if (!user) {
        return res.redirect('/')
    }
    if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3er123') {
        user.role = 'admin'
    app.use('/', sessionViewsRouter)
} else {
    user.role = 'user'
}
req.session.user = user
res.redirect('/products')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).render('errors/base', { error: err });
        } else {
            res.redirect('/');
        }
    });
});


export default router