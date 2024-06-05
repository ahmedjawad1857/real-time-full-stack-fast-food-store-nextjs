import mongooseConnection from "@/mongoose-config/page";
import nodemailer from "nodemailer";
export async function POST(req: any) {
  try {
    {
      const body = await req.json();
      console.log(`body ${body}`);
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "ahmedjawad1857@gmail.com",
          pass: process.env.MY_PASSWORD,
        },
      });

      // Setup email data with unicode symbols
      const mailOptions = {
        from: '"Ahmad Jawad" ahmedjawad1857@gmail.com',
        to: body.reciepent,
        subject: "Subscription Confirmation",
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Subscription Confirmation</title>
          <style>
              /* Add your CSS styles here */
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Our Newsletter!</h1>
              <p>Dear subscriber,</p>
              <p>Thank you for subscribing to our newsletter. You're now part of an exclusive community where you'll receive the latest updates, offers, and news straight to your inbox.</p>
              <p>To ensure you receive our emails, please add our email address to your contact list.</p>
              <p>We promise to only send you valuable content that you'll love. Feel free to <a href="mailto:info@example.com">Contact Us</a> if you have any questions or feedback.</p>
              <p>Happy reading!</p>
              <div class="footer">
                  <p>Best regards,<br>The [Your Company Name] Team</p>
              </div>
          </div>
      </body>
      </html>
  `,
      };

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        return Response.json("Message sent succesfully!");
      });
    }
  } catch (e) {
    console.log("error", e);
    return Response.json("There is a problem while Sending Message");
  }
}
