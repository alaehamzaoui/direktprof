const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (to, subject, text, appointment = null, isProfessor = false) => {
  let deleteLink = appointment ? `\n\nUm den Termin zu stornieren, klicken Sie auf den untenstehenden Link:\n${process.env.BASE_URL}/delete-appointment/${appointment.id}` : '';
  let emailText = `${text}${deleteLink}`;

  if (isProfessor) {
    emailText = `${text}\n\nDetails zum Termin:\n- Anliegen: ${appointment.object}\n- Datum: ${appointment.datum}\n- Startzeit: ${appointment.start}\n- Endzeit: ${appointment.ende}\n- Raum: ${appointment.raum}\n- Student: ${appointment.studentName}\n- Matrikelnummer: ${appointment.matrikelNumber}\n- Student Email: ${appointment.studentEmail}`;
  } else {
    emailText = `${text}\n\nDetails zum Termin:\n- Professor: ${appointment.professorName}\n- Datum: ${appointment.datum}\n- Startzeit: ${appointment.start}\n- Endzeit: ${appointment.ende}\n- Raum: ${appointment.raum}${deleteLink}`;
  }

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text: emailText,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

const sendDeletionEmail = (to, appointment) => {
  const subject = 'Termin wurde storniert';
  const text = `Der Termin mit folgenden Details wurde storniert:\n- Anliegen: ${appointment.object}\n- Datum: ${appointment.datum}\n- Startzeit: ${appointment.start}\n- Endzeit: ${appointment.ende}\n- Raum: ${appointment.raum}\n- Student: ${appointment.studentName}\n- Matrikelnummer: ${appointment.matrikelNumber}\n- Student Email: ${appointment.studentEmail}`;
  
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = { sendEmail, sendDeletionEmail };
