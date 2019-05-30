const nodemailer = require('nodemailer');
// const pool = require('../modules/pool');

function sendEmail(email, res) {
  // nodemailer set-up
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'a.allendabney@gmail.com',
      pass: 'Xayden8914',
    },
  });

  const mailOptions = {
    from: 'a.allendabney@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'IT WORKS!', // Subject line
    html: `<p>${email}, hello friend</p>`, // plain text body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(info);
      res.sendStatus(200);
    }
  });
}

function removeDuplicates(emails, res) {
  const unique = {};
  emails.forEach((i) => {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  const uniqueEmail = Object.keys(unique);
  for (const email of uniqueEmail) {
    console.log('unique email', email);
    sendEmail(email, res);
  }
}

module.exports = { sendEmail, removeDuplicates };
