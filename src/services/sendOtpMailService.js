import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

// This service sends an OTP email to the user for verification purposes after fill signup form.
export const sendOtpMailService = async (email, otp, name ) => {

    const myEmail = process.env.EMAIL_USER;
    const myPassword = process.env.EMAIL_PASS;

    if(!otp || !email) {
        throw new Error("Email and OTP are required to send the email.");
    }

    const config = {
        service : "gmail",
        auth : {
            user: myEmail,
            pass: myPassword
        }
    }

    // Create an account with real credentials.
    const transporter = nodemailer.createTransport(config);

    // confirm transporter works
    await transporter.verify();

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Autonix",
            link: "https://autonix.com",
        }
    })

    // Create the email content
    const emailContent = {  
        body: {
            name: name,
            intro: 'You are receiving this email because we received a request to verify your email address.',
            
            action: {
            instructions: 'Use the following OTP to complete your verification:',
            button: {
                color: '#22BC66', // green color
                text: `OTP: ${otp}`, // will appear big and bold
                //link: 'https://yourdomain.com/verify' // or just '#'
            }
            },

            outro: 'This OTP is valid for 10 minutes. If you did not request this, please ignore this email.'
        }
    }

    // Generate the HTML content
    const mailHtmlBody = mailGenerator.generate(emailContent);

    // Define the email message
    const message = {
        from: myEmail,
        to: email,
        subject: "Your OTP for Verification",
        html: mailHtmlBody,
    }

    // Send the email
    const info = await transporter.sendMail(message);

    return info.messageId ? info.messageId : null;
}