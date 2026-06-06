import nodemailer from "nodemailer";

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });

const validateForm = (payload) => {
  const errors = [];
  if (!payload.name?.trim()) errors.push("Name is required.");
  if (!payload.email?.trim() || !/\S+@\S+\.\S+/.test(payload.email))
    errors.push("Valid email is required.");
  if (
    !payload.phone?.trim() ||
    !/^[6-9]\d{9}$/.test(payload.phone.replace(/\s/g, ""))
  )
    errors.push("Valid 10-digit mobile required.");
  if (!payload.subject?.trim()) errors.push("Subject is required.");
  if (!payload.message?.trim() || payload.message.trim().length < 10)
    errors.push("Message must be at least 10 characters.");
  if (payload.botField?.trim()) errors.push("Spam detected.");
  return errors;
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ success: false, error: "Method not allowed." }),
    };
  }

  let data;
  try {
    data = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        error: "Invalid request payload.",
      }),
    };
  }

  const validationErrors = validateForm(data);
  if (validationErrors.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        error: validationErrors.join(" "),
      }),
    };
  }

  const transporter = createTransporter();

  const sentAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const company = data.company?.trim() || "N/A";
  const html = `
    <h2>New VEXARO Contact Form Enquiry</h2>

    <table cellpadding="6" cellspacing="0" border="0">
      <tr><td><strong>Submitted At</strong></td><td>${escapeHtml(sentAt)}</td></tr>
      <tr><td><strong>Full Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>
      <tr><td><strong>Subject</strong></td><td>${escapeHtml(data.subject)}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `;

  const text = `New VEXARO Contact Form Enquiry\n\nSubmitted At: ${sentAt}\n\nFull Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${company}\n\nSubject:\n${data.subject}\n\nMessage:\n${data.message}`;

  const replyHtml = `
    <p>Dear ${escapeHtml(data.name)},</p>
    <p>Thank you for contacting VEXARO Courier Solutions.</p>
    <p>We have successfully received your enquiry and our team will get back to you within 2 business hours.</p>
    <p>Regards,<br/>VEXARO Courier Solutions<br/>https://vexarocouriersolutions.com</p>
  `;

  const replyText = `Dear ${data.name},\n\nThank you for contacting VEXARO Courier Solutions.\n\nWe have successfully received your enquiry and our team will get back to you within 2 business hours.\n\nRegards,\nVEXARO Courier Solutions\nhttps://vexarocouriersolutions.com`;

  try {
    await transporter.sendMail({
      from: `"Vexaro Courier Solutions" <${process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `VEXARO Website Enquiry: ${data.subject}`,
      text,
      html,
    });

    await transporter.sendMail({
      from: `"Vexaro Courier Solutions" <${process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: `${data.name} <${data.email}>`,
      subject: "Thank You for Contacting VEXARO",
      text: replyText,
      html: replyHtml,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Message sent successfully.",
      }),
    };
  } catch (error) {
    console.error("CONTACT FORM ERROR", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || "Failed to send email.",
      }),
    };
  }
};
