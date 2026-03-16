require('dotenv').config();
const nodemailer = require('nodemailer');

// emails  handled by - SMTP servers of google
// server se interact krne ke liye we use transporter and some env details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Job-portal" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegisterationEmail(userEmail,name){
    const subject = 'Welcome to our Online Job Portal platform!';
    const text = `Hello ${name},\n\n Thank you for registering at Job Portal. We are exicited to see you on our board!.`;
    const html = `<p>Hello ${name},</p><p>Thank You for registering at Job Portal</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendApplicationStatusEmail(userEmail,name,jobTitle,status){
    const subject = `Your Application has been ${status.toUpperCase()}`;

    const text = `Hello ${name},    Your Application for the position "${jobTitle}" has been ${status}.
        Thank You for using our Job Portal.
        Best Regards,
        Job Portal Team`;

    const html = `<h2>Hello ${name},</h2>
        <p>Your application for the position <b>${jobTitle}</b> has been <b style="color:${status === "accepted" ? "green" : "red"}">${status.toUpperCase()}</b>.</p>
        <p> Thank You for using our Job Portal.</p>
        <br/>
        <p> Best Regards,<br/> Job Portal Team</p>`;

    await sendEmail(userEmail,subject, text, html);
}


module.exports ={ sendRegisterationEmail , sendApplicationStatusEmail } ;