const nodemailer = require("nodemailer");


exports.sendEmail = async(options)=>{
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "45579e661a3a0d",
          pass: "de6471a90f0835"
        }
      });

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.message,
        text:options.message,
    }


    await transporter.sendMail(mailOptions);
};