import nodemailer from "nodemailer";
import config from "../config/config.js";
import Mailgen from "mailgen";
import logger from "../utils/logger.js";

export const getbill = async (destinatario, ticket) => {
  try {
    let configMail = {
      service: "gmail",
      auth: {
        user: config.checkout.checkoutUser,
        pass: config.checkout.checkoutPass,
      },
      tls: {
        rejectUnauthorized: false, // Agrega esta línea para evitar el error del certificado
      },
    };

    let transporter = nodemailer.createTransport(configMail);

    let Mailgenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Movies",
        link: "http://www.movies.com",
      },
    });

    logger.info("ticket dentro del service", ticket);

    const totalAmount = ticket.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    21654;

    let response = {
      body: {
        intro: "Your bill has arrived!",
        table: {
          data: ticket.products.map((product) => ({
            //CORREGIR NO LLEGA EL NOMBRE SINO EL ID
            item: product.productTitle,
            price: `$${product.price}`,
            quantity: product.quantity,
            amount: `$${product.price * product.quantity}`,
          })),
        },
        outro: `Total Amount: $ ${totalAmount.toFixed(2)}`,
      },
    };

    let mail = Mailgenerator.generate(response);

    let message = {
      from: "Movies-Cartelera de Cine <Movies-Cartelera@movies-cartelera.com>",
      to: destinatario,
      subject: `Compra ${ticket.code} realizada con éxito`,
      html: mail,
    };

    await transporter.sendMail(message);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default getbill;
