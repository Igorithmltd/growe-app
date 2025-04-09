import emailjs from 'emailjs-com';

const sendOtpEmail = (email: string, to_name: string, otp: string): void => {
  const templateParams: Record<string, unknown> = {
    email: email,
    to_name: to_name,
    from_name: "Growe App",
    message: `${otp} is your OTP for Growe App`,
  };

  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    )
    .then(
      (response) => {
        console.log('Email sent successfully', response);
      },
      (err) => {
        console.error('Error in sending email', err);
      }
    );
};

export default sendOtpEmail;
