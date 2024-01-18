exports.sendEmail = async()=>{
    const { createTransport } = require('nodemailer');

    const transporter = createTransport({
        host: process.env.email_host, //SMTP SERVER
        port: process.env.email_port, //SMTP PORT
        auth: {
            user: process.env.Login_Email, //Login
            pass: process.env.email_api_key_password, //API KEY
        },
    });
    const mailOptions = {
        from:process.env.email_from,
        to: process.env.email_to,
        subject: "Test Email",
        text: "This is a test email sent from Node.js with Nodemailer.",
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Email not sent: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

