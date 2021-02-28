const nodemailer = require('nodemailer');

async function sendMail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testmailforprakash@gmail.com',
      pass: 'prakashdeveloper',
    },
  });

  const info = await transporter.sendMail({
    from: '"Prakash T" <testmailforprakash@gmail.com>',
    to: email,
    subject: 'Hello',
    text: 'Login Link',
    html: `<a href="http://localhost:3000/login/">login</a>`,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendMail };
