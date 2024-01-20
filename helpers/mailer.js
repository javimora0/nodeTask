const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.API_KEY
    }
});

const sendMail = async (mail, newPassword) => {
    const mailOptions = {
        from: 'javier.dulcinea@gmail.com',
        to: mail,
        subject: 'Nueva contraseña',
        text: `Su nueva contraseña: ${newPassword}`
    };

   return await transporter.sendMail(mailOptions)
}

module.exports = {
    sendMail
}