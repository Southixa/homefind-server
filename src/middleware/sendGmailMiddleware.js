import nodemailer from "nodemailer"
import { statusMessage } from "../config/index.js";

const sendEmail = async (to, text) => {
    const transporter = nodemailer.createTransport({
        service: statusMessage.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD_APP
        }
    });

    const mailOptions = {
        from: process.env.USER,
        to: to,
        subject: statusMessage.SUBJECT,
        html: `<h4>${text}<h4>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info.response
    } catch (error) {
        console.log(error);
        return error
    }
};

const sendEmailToAdmin = async (from, text) => {
    const transporter = nodemailer.createTransport({
        service: statusMessage.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD_APP
        }
    });
    const mailOptions = {
        from: from,
        to: process.env.USER,
        subject: statusMessage.SUBJECT,
        html: `<h4>${text}<h4>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info.response
    } catch (error) {
        console.log(error);
        return error
    }
};
export {sendEmail, sendEmailToAdmin}
