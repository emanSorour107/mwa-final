require('dotenv').config();
const send = require('gmail-send')({
    user: process.env.SEND_EMAIL,
    pass: process.env.SEND_PASSWORD
});

 
console.log(9999, process.env.DB_URL)

const Mail = {
    sendMail: (data, callback) => {
        let { to, subject = "Blank subject", text } = data;
        send({
            to: to,
            subject: subject,
            text: text
        }, (error, result, fullResult) => {
            if (error) console.error(error);
            console.log(result);
        })
    }
}

module.exports = Mail