import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import Sockets from './sockets.js'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from "connect-mongo";
import passport from "passport";    //corre de la libreria 
import initializePassport from "./config/passport.config.js";  // funcion que escribi en config
import productsRouter from './routers/product.router.js'
import cartsRouter from './routers/cart.router.js'
import viewsRouter from './routers/views.router.js'
import chatRouter from './routers/chat.router.js'
import sessionViewsRouter from './routers/session.views.router.js'
import sessionRouter from './routers/session.router.js';
import config from './config/config.js'
import { privateRoutes, publicRoutes } from "../src/middlewares/auth.middleware.js"





//const MONGO_URI = 'mongodb+srv://coder:coder@cluster0.tzksvyu.mongodb.net/'
//const MONGO_DB_NAME = 'ecommerce'
//export const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('./src/public'))


app.use(session ({
  store: MongoStore.create({
    mongoUrl: config.mongo.uri,
    dbName: config.mongo.dbName,
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Duración de la sesión en milisegundos
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//Handlebars configuration

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }));

////Passport

initializePassport() 
app.use(passport.initialize())  
app.use(passport.session())   







try {
    await mongoose.connect(config.mongo.uri, { 
        dbName: config.mongo.dbName,
        useUnifiedTopology: true
    })
    console.log('DB connected!')
    const server = app.listen(config.apiserver.port, () => console.log('Server Up'))
    const io = new Server(server)
    app.use((req, res, next) => {
        req.io = io
        next()
    })

    
    app.use('/', sessionViewsRouter)
    app.use('/api/sessions', sessionRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)
    app.use('/products', privateRoutes, viewsRouter)
    app.use('/productsFromCart', viewsRouter)
    app.use('/carts', viewsRouter)
    app.use("/chat", chatRouter)

    

    Sockets(io)
} catch(err) {
    console.log('Cannot connect to DB :(  ==> ', err.message)
    process.exit(-1)
}

