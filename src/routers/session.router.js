import { Router } from "express";
import UserModel from "../dao/models/user.model.js"
import passport from "passport";

const router = Router()


//API para crear usuarios en la DB


router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failRegister'}), //este es el middleware
async(req, res) => {
    res.redirect('/')
})

/*
router.post('/register', async (req, res) => {
    
  
    const newUser = req.body
    const user = new UserModel(newUser)
    await user.save()
    res.redirect('/')
})
*/

router.get('/failRegister', (req, res) => res.send({ error: 'Passport register failed' }))// aca se crea la ruta de failRegister



//Sessions da a la vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login')
})


//API para login

     router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failLogin'}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        //age: req.user.age,
        role: req.user.role,
        cart: req.user.cart
    }
    res.redirect('/products')
    })



router.get('/failLogin', (req, res) => res.send({ error: 'Passport login failed' }))


//Vista para registrar usuarios

router.get('/register', (req, res) => {
    res.render('sessions/register')
})






//Cerrar Session

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

//Github

router.get('/github', passport.authenticate('github', {scope:['user:email']}), (req, res) => { })  //email lo tomo como usuario


router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async(req, res) => {
    console.log('Callback: ', req.user)
    req.session.user = req.user
    res.redirect('/products')
})


export default router