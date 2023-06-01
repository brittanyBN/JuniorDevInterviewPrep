const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
    try {
        let transporter = nodemailer.createTransport({
            service: process.env.SERVICE_SMTP,
            host: process.env.HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
                type: 'login',
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP,
            },
        });

        let info = await transporter.sendMail({
            from: 'juniordevinterviewprep@gmail.com',
            to: options.email,
            subject: "Reset Password",
            text: options.message,
        });
        console.log("info", info);
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;