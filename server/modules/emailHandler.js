const nodemailer = require('nodemailer');
// const pool = require('../modules/pool');

function sendEmail(email, res) {
  // nodemailer set-up
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'noreplymplscommed@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Please review your schedule!', // Subject line
    html: `<p>Hello instructor!</p>
      <p>Your proposed schedule for the upcoming session of the Minneapolis Public School District's community education program is now available for review.</p>
      <p>Please click this <a href="http://localhost:3000/instructor_login" target="_blank" rel="noopener noreferrer">link</a> to review your schedule, or copy and paste the link below into the URL bar of your browser.</p>
      <p><a href="http://localhost:3000/instructor_login" target="_blank" rel="noopener noreferrer">http://localhost:3000/instructor_login</a></p>
      <p>For any additional questions, please reach out to Eliana Power directly. This email address is not monitored.</p>
      <p>Thank you!</p>`, // plain text body
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
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

  uniqueEmail.forEach((email) => {
    sendEmail(email, res);
  });
}

module.exports = { sendEmail, removeDuplicates };
