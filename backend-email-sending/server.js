const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;


app.use(cors()); 
app.use(bodyParser.json({ limit: '50mb' }));  // Increase the limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/send-email', async (req, res) => {
  const { email, pdf } = req.body;

  if (!email || !pdf) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'email-smtp.ap-southeast-1.amazonaws.com', // Replace with your region
        port: 587, 
        secure: false, 
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASS,
        },
  });

  const pdfBuffer = Buffer.from(pdf, 'base64');

  const mailOptions = {
    from: 'hello@dconstruct.co',
    to: email,
    subject: 'Test Email',
    text: 'This is a test email sent from your server!',
    attachments: [
      {
        filename: 'quotation.pdf', // Name the file as 'quotation.pdf'
        content: pdfBuffer, // Attach the PDF buffer
        encoding: 'base64', // Specify the encoding
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

