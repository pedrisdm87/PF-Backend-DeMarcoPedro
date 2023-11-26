/*

import nodemailer from 'nodemailer';
import config from '../config/config.js';
import Mailgen from 'mailgen';

const getbill = async (destinatario, ticket) => {
 
    let configCorreo = {
      service: "gmail",
      auth: {
        user: config.checkout.checkoutUser,
        pass: config.checkout.checkoutPass
      }
    };
    let transporter = nodemailer.createTransport(configCorreo);
    let Mailgenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Movies',
        link: 'http://www.movies.com',
      }
    });
    let response = {
      body: {
        intro: "Your bill has arrived!",
        table: {
          data: ticket.products.map((product) => ({
            item: product.product,
            price: `$${product.price}`,
            quantity: product.quantity,
          })),
        },
        outro: `Total Amount: $${ticket.amount.toFixed(2)}`
      }
    };
    let mail = Mailgenerator.generate(response);
    let message = {
      from: 'Movies-Cartelera de Cine <Movies-Cartelera@movies-cartelera.com>',
      to: destinatario,
      subject: `Compra ${ticket.code} realizada con éxito`,
      html: mail,
    };

    await transporter.sendMail(message);

    //return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

export default getbill;
*/
// ELIUD
/*
import nodemailer from 'nodemailer'
import config from '../config/config.js'; 
import twilio from 'twilio'
import Mailgen from 'mailgen'
import { UserService, CartService, ProductService } from "../services/services.js";

export const checkoutGmail = async (req, res) => {
    //const userId = req.session.user;
    //const id = req.session.user.cart
    try {
        const user = await UserService.getById(userId);
        const destinatario = user.email;
        const productsInCart = await CartService.getCartById(id);

        let configCorreo = {
            service: "gmail",
            auth: {
                user: config.checkout.checkoutUser,
                pass: config.checkout.checkoutPass
            }
        };

        let transporter = nodemailer.createTransport(configCorreo);
        let Mailgenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Movies',
                link: 'www.movies.com',
            }
        });

        // Busco la información completa de cada producto en el carrito
        const detailedProducts = await Promise.all(productsInCart.products.map(async (product) => {
            const productDetails = await ProductService.findById(product.product);
            return {
                title: productDetails.title,
                description: productDetails.description,
                price: productDetails.price,
                quantity: product.quantity,
            };
        }));

        let response = {
            body: {
                intro: "Your bill has arrived!",
                table: {
                    data: detailedProducts.map(product => ({
                        item: product.title,
                        description: product.description,
                        price: `$${product.price * product.quantity}`
                    })),
                },
                outro: 'Looking forward to do more business'
            }
        };

        
          
        let mail = Mailgenerator.generate(response);

        let message = {
            from: 'Movies - <movies@gmail.com>',
            to: destinatario,
            subject: `Compra  realizada con éxito`, 
            html: mail
        };
       
        transporter.sendMail(message)
            .then(() => {
                return res.status(200).json({ message: 'You have received an email' });
            })
            
            .catch(err => res.status(500).json({ err: err.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
};



export const checkoutSms = (req, res) => {
    try {
      
      const newPhoneNumber = req.body.phoneNumber.phoneNumber.value;
      
      if (!newPhoneNumber) {
        throw new Error('Número de teléfono no proporcionado');
      }
   
      const accountSid = config.checkout.checkoutSmsSid;
      const authToken = config.checkout.checkoutSmsToken;
  
      const client = twilio(accountSid, authToken);
  
      client.messages
        .create({
          body: 'Su compra ha sido exitosa, pronto estarán llegando sus productos',
          from: config.checkout.checkoutNumero,
          to: +541167643721,
        })
        .then((message) => {
          console.log('Mensaje enviado con éxito:', message.sid);
          res.status(200).json({ status: 'success', message: 'Mensaje enviado con éxito' });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Error al enviar el mensaje' });
        });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error en la solicitud' });
    }
  };
  */
  
  