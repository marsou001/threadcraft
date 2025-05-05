import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const smtpConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
}

const transporter = nodemailer.createTransport(smtpConfig);

async function sendMail(recipientEmail: string, recipientName: string) {
  try {
    const mailOptions: MailOptions = {
      to: recipientEmail,
      subject: `Welcome to Threadly AI ${recipientName}`,
      html: `
        <h1>Welcome to Threadly AI, ${recipientName}!</h1>
        <p>We're excited to have you on board. Get started by...</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending welcome email: ", error);
  }
}

export default sendMail;