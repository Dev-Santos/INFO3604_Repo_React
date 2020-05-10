const config = require('config');
const sgMail = require('@sendgrid/mail');//Sendgrid Email module

sgMail.setApiKey(config.get('EMAIL_API_KEY'));

const sendMail = (email, subject, text, html) => {

    //Setup email information
    const msg = {
        to: email,
        from: config.get('EMAIL_USER'),
        subject,
        text,
        html
    };
  
    //Send email to corresponding user
    sgMail.send(msg)
    .then( sent => {
        console.log('Email sent');
    })
    .catch( err => {
        console.log('Email not sent');//If an error is caught in sending the email
        console.log(err);
    });
    
}

module.exports = sendMail;