import nodemailer from 'nodemailer';
import config from '../config/config.js';
import Mailgen from 'mailgen';
import logger from '../utils/logger.js';
import { TicketService } from './services.js';


export const restorePasswordMail = async (destinatario, token) => {
  try {
  const mailerConfig = {
    service: 'gmail',
    auth: { 
      user: config.checkout.NODEMAILER_USER,
      pass: config.checkout.NODEMAILER_PASS },
      tls: {
        rejectUnauthorized: false,
      }
}
  let transporter = nodemailer.createTransport(mailerConfig)
  let Mailgenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Movies',
      link: 'http://www.movies.com',
    },
  });
  //console.log ('token',token)

  let response = {
    body:{
      intro: "Restore your password",
      action: {
        instructions: 'Click button to reset your password',
        button: {
            color: '#DC4D2F',
            text: 'Reset your password',
            link: `http://localhost:8080/reset-password/${token}`
        }
        },
      outro: 'If you did not request a password change, discard this email'
    }
  }
  let mail = Mailgenerator.generate(response)

let message = {
    from: 'Movies',
    to: destinatario,
    subject: 'Reset password link',
    html: mail
}
    await transporter.sendMail(message)
    return { success: true, message: 'Email sent successfully' };
} catch (err) {
  logger.error('error al generar mail', err)
  return { success: false, error: err.message }
}
}

export const UserDeleted = async (destinatario) => {
  try {
    let config = {
      service: 'gmail',
      auth: {
        user: config.checkout.NODEMAILER_USER,
        pass: config.checkout.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      }
  }

    let transporter = nodemailer.createTransport(config);

    let Mailgenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Movies',
        link: 'http://www.movies.com',
      },
    });

    let response = {
      body: {
        intro: "Your User has been deleted  from our service due to inactivity.\n\nDeletion Reason: Inactive Account\nDeletion Date: " + new Date().toLocaleDateString(),

        outro: `If you want to subscribe again visit us http://localhost:8080`,
      },
    };

    let mail = Mailgenerator.generate(response)

    let message = {
      from: 'Movies.com',
      to: destinatario,
      subject: `Your user ${destinatario} has been deleted  `,
      html: mail,
    };

    await transporter.sendMail(message)
    return { success: true, message: 'Email sent successfully' }
  } catch (err) {
    logger.error('error al generar mail', err)
    return { success: false, error: err.message }
  }
}

export const YourProductHasBeenDeleted = async (destinatario, productId) => {
  try {
    let config = {
      service: 'gmail',
      auth: {
        user: config.checkout.NODEMAILER_USER,
        pass: config.checkout.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      }
  }

    let transporter = nodemailer.createTransport(config)

    let Mailgenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Movies',
        link: 'http://www.movies.com',
      },
    });

    let response = {
      body: {
        intro: `Your Product ${productId} Has Been Deleted from the Data Base By Administation`,

        outro: `For more information please contact us, Thank you`,
      },
    };

    let mail = Mailgenerator.generate(response);

    let message = {
      from: 'Movies',
      to: destinatario,
      subject: `Your product has been deleted  `,
      html: mail,
    };

    await transporter.sendMail(message);
    return { success: true, message: 'Email sent successfully' };
  } catch (err) {
    logger.error('Email cannot be sent', err)
    return { success: false, error: err.message }
  }
}