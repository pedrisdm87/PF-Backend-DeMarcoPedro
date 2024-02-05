import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import Sockets from "./sockets.js";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport"; //corre de la libreria
import initializePassport from "./config/passport.config.js"; // funcion que escribi en config
import productsRouter from "./routers/product.router.js";
import cartsRouter from "./routers/cart.router.js";
import viewsRouter from "./routers/views.router.js";
import chatRouter from "./routers/chat.router.js";
import sessionViewsRouter from "./routers/session.views.router.js";
import sessionRouter from "./routers/session.router.js";
import config from "./config/config.js";
import mockingRouter from "./routers/mocking.router.js";
import errorHandler from "./middlewares/errors.js";
import logger from "../src/utils/logger.js";
import loggerTestRouter from "./routers/loggerTest.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import paymentRouter from "./routers/payment.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('./src/public'))

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Movies",
      description: "Portal para compra de entradas de cine",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.uri,
      dbName: config.mongo.dbName,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Duración de la sesión en milisegundos
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Handlebars configuration

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

////Passport

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

try {
  await mongoose.connect(config.mongo.uri, {
    dbName: config.mongo.dbName,
    useUnifiedTopology: true,
  });
  logger.info("DB connected!");
  const server = app.listen(config.apiserver.port, () =>
    logger.info("Server Up")
  );
  const io = new Server(server);
  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use("/", sessionViewsRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/products", viewsRouter);
  app.use("/productsFromCart", viewsRouter);
  app.use("/carts", viewsRouter);
  app.use("/chat", chatRouter);
  app.use("/mockingproducts", mockingRouter);
  app.use("/loggerTest", loggerTestRouter);
  app.use("/pay", paymentRouter);
  app.use(errorHandler);
  //app.use('/checkout', checkoutRouter)

  Sockets(io);
} catch (err) {
  logger.info("Cannot connect to DB :(  ==> ", err.message);
  process.exit(-1);
}
