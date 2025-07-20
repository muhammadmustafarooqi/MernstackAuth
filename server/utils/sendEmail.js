// utils/sendEmail.js
import resend from './resendClient.js';

/**
 * Send email using Resend
 * @param {string} to - Receiver email
 * @param {string} subject - Email subject
 * @param {string} html - Email body in HTML
 */
const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend Email Error:", error.message);
      throw new Error("Failed to send email");
    }

    console.log(`✅ Email sent successfully to ${to}`);
    return data;
  } catch (err) {
    console.error("❌ Email Send Failed:", err.message);
    throw err;
  }
};

export default sendEmail;
