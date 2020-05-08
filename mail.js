const nodemailer = require('nodemailer');
const config = require('config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('EMAIL_USER'),
        pass: config.get('EMAIL_PASSWORD')
    }
});

const sendMail = (email, subject, text, cb) => {

    let mailOptions = {
        from: 'emargin8.rsc@gmail.com',
        to: email,
        subject,
        text
    }
    
    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            cb(err, null);
        }else{
            cb(null, data);
        }
    })

}

module.exports = sendMail;