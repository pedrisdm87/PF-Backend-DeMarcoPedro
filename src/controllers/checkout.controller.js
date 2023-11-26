import nodemailer from 'nodemailer'
import config from '../config/config.js'
import Mailgen from 'mailgen'
import { UserService, CartService, ProductService } from "../services/services.js";


const getbill = async (req, res) => {
    const userId = req.session.user
    const cartId = req.session.cart
    console.log(userId)

    try {
        const user = await UserService.getById(userId)
        const destinatario = user.email
        const productsInCart = await CartService.getCartById(cartId
            )
    let configCorreo = {
        service: "gmail",
        auth: {
            user: config.checkout.checkoutUser,
            pass: config.checkout.checkoutPass
        }
    }
    let transporter = nodemailer.createTransport(configCorreo)
    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Movies',
            link: 'http://www.movies.com'
        }
    })

    //Busco info de prods en el carrito

    const detailedProducts = await Promises.all(productsInCart.products.map(async (product) =>{
        const productDetails = await ProductService.getProductByIDFromDB(product.product);
        return {
            title: productDetails.title,
            price: productDetails.price,
            quantity: product.quantity
        }

    }))

    let response = {
        body: {
            intro: "Your bill has arrived!",
            table: {
              data: detailedProducts.map((product) => ({
                item: product.title,
                price: `$${product.price}`,
                quantity: product.quantity,
              })),
            },
            outro: `Looking forward to do more business`
          }
    }
    let mail = Mailgenerator.generate(response)

    let message = {
        from: 'Movies-Cartelera de Cine <Movies-Cartelera@movies-cartelera.com>',
        to: destinatario,
        subject: `Compra ${ticket.code} realizada con éxito`,
        html: mail
    }
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).json({ message: 'You have received an email' })
        })
        .catch(err => res.status(500).json({ err: err.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

export default getbill;
