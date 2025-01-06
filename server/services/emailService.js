const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Kendi e-posta adresiniz
    subject: `Yeni İletişim Formu: ${data.subject}`,
    html: `
      <h2>Yeni İletişim Formu Mesajı</h2>
      <p><strong>Gönderen:</strong> ${data.name}</p>
      <p><strong>E-posta:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.phone || 'Belirtilmemiş'}</p>
      <p><strong>Konu:</strong> ${data.subject}</p>
      <h3>Mesaj:</h3>
      <p>${data.message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail }; 