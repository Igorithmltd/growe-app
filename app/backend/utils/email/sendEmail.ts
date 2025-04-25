import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_AUTH_EMAIL,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
  },
});

const sendEmail = async ({
  subject = "New Mail",
  html,
  to,
}: {
  subject: string;
  html: string;
  to: string;
}) => {
  try {
    if (!to || !subject || !html) {
      console.log({
        success: false,
        message: "Please provide email options [to from subject html]",
      });
      return false;
    }
    transporter.sendMail({to, subject, html, from: 'groweapp@support.com'}, (err, info) => {
      if (err) {
        return console.log("Error sending mail:", err.message);
      }
      console.log("Mail sent!", info.response);
    });
    return true;
  } catch (error: any) {
    console.log(error.message, "caught error here");
  }
};

export default sendEmail;
