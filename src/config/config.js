import dotenv from 'dotenv';
dotenv.config()

export default {
    
    apiserver: {
        port: process.env.PORT
    },
    mongo: {
        uri: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB_NAME
    },
    admin:{
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS
    },
    github:{
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    checkout: {
        checkoutUser: process.env.NODEMAILER_USER,
        checkoutPass: process.env.NODEMAILER_PASS,
        checkoutSmsSid: process.env.TWILIO_ACCOUNT_SID,
        checkoutSmsToken: process.env.TWILIO_AUTH_TOKEN,
        checkoutNumero: process.env.TWILIO_PHONE_NUMBER
    },
    enviroment:{
        enviromentDev: process.env.ENVIROMENT_DEV,
        enviromentProd: process.env.ENVIROMENT_PROD
    }

}