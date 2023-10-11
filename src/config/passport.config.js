import passport from "passport"
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils.js"
import userModel from "../dao/models/user.model.js"


const localStrategy = local.Strategy 

const initializePassport = () => {
    //logica de registro ---ahora este es el middleware
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async( req, username, password, done ) =>{
        const {first_name, last_name, email, age} = req.body
        try{
            const user = await userModel.findOne({ email: username })
            if (user){
                return done(null, false)
            }
            const newUser = {
                first_name, last_name, email, age, role:'user', password: createHash(password)
            }
            const result = await userModel.create(newUser)
            return done (null, result)
        }catch(err){
            return done(err)
        }
    })) 
    
    //logica de login
    passport.use('login', new localStrategy({
        usernameField: 'email',
    }, async(username, password, done) => {
        try {
            /*if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                const admin = {
                    _id: 'admin', 
                    first_name: 'Administrador',
                    email: username,
                    role: 'admin',
                };
                return done(null, admin);
            }
                */
            const user = await userModel.findOne({ email: username })
            if (!user) {
                return done(null, false)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch(err) {return done(err)}
    }))

    //credenciales de terceros
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.d8815f345a71fa02', 
        clientSecret: '103f18e1bced055693c482a109bb355947f2d020',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async(accessToken, refreshToken, profile, done) =>{
        console.log(profile)
        try{
            const user = await userModel.findOne({email: profile._json.email})
            if (user) return done(null, user) //si ya existe el ususario no lo guarda en base de datos
            const newUser = await userModel.create({
                first_name: profile._json.login,
                last_name: profile._json.name,
                email: profile._json.email,
                password: profile._json.password,
                role: profile._json.type
            })
            return done(null, newUser)
        }catch(err) {
            return done('Error to login with github')
        }
    }))

    passport.serializeUser((user, done) => {    //sirve para que passport grabe datos en la session solo el id del usuario graba
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {  //para que teniendo el id puede obtener el resto de los datos del usuario
        if (id === 'admin') {
            const adminUser = {
                _id: 'admin',
                username: 'adminCoder@coder.com',
                role: 'admin',
            };
            return done(null, adminUser);
        }
        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializePassport