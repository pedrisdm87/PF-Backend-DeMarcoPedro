import nodemailer from 'nodemailer';
import config from '../config/config.js';
import Mailgen from 'mailgen';

const getbill = async (destinatario, ticket) => {
  try {
    let configMail = {
      service: 'gmail',
      auth: {
        user: config.checkout.checkoutUser,
        pass: config.checkout.checkoutPass,
      },
    };

    let transporter = nodemailer.createTransport(configMail);

    let Mailgenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Movies',
        link: 'http://www.movies.com',
      },
    });

    console.log('ticket dentro del service', ticket)

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
        outro: `Total Amount: $`,
      },
    };

    let mail = Mailgenerator.generate(response);

    let message = {
        from: 'Movies-Cartelera de Cine <Movies-Cartelera@movies-cartelera.com>',
      to: destinatario,
      subject: `Compra ${ticket.code} realizada con éxito`,
      html: mail,
    };

    await transporter.sendMail(message);
    return { success: true, message: 'Email sent successfully' };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default getbill;