import { AccountUserModel } from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({ email, emailType, userId }: { email: string, emailType: string, userId: string }) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await AccountUserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      });
    } else if (emailType === "RESET") {
      await AccountUserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "36b311050ab1c1",
        pass: "9d00c06a618aca"
      }
    });




    const mailOptions = {
      from: 'transaction.visualizer@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password',
      // text: emailType === 'verify' ? 'Please click on the link to verify your email' : 'Please click on the link to reset your password',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
      ${emailType === "VERIFY" ? "Verify your email" : "Reset your Password"} 
      or copy and paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
  if (error instanceof Error) {
    return Error(error.message);
  } else {
    return Error("An unknown error occurred");
  }
  }
}