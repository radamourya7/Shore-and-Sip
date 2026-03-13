import nodemailer from 'nodemailer';

// Lazy transporter — created on first use so process.env is fully loaded by then
let _transporter = null;
const getTransporter = () => {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,       // STARTTLS
      requireTLS: true,
      connectionTimeout: 10000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return _transporter;
};

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// Guest confirmation email
export const sendBookingConfirmation = async (booking, room) => {
  const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f7f8fc;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#D4854A,#b8683a);padding:40px 32px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:28px;font-family:Georgia,serif;">🌊 Shore & Sip</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Beachside Cafe & Stay — Gokarna</p>
        </div>
        
        <!-- Body -->
        <div style="padding:40px 32px;">
          <h2 style="color:#1A1A2E;margin:0 0 8px;font-size:22px;">Booking Confirmed! ✅</h2>
          <p style="color:#555;margin:0 0 32px;line-height:1.6;">
            Hi <strong>${booking.name}</strong>, your booking at Shore & Sip Gokarna has been confirmed. 
            We can't wait to welcome you!
          </p>

          <!-- Booking Details Box -->
          <div style="background:#fff8f2;border:1px solid rgba(212,133,74,0.25);border-radius:12px;padding:24px;margin-bottom:28px;">
            <h3 style="color:#D4854A;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;">Booking Details</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#7a7a9a;font-size:14px;width:40%;">Booking ID</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;font-size:14px;">#${booking._id.toString().slice(-8).toUpperCase()}</td></tr>
              <tr style="border-top:1px solid #f0e8e0;"><td style="padding:8px 0;color:#7a7a9a;font-size:14px;">Room</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;font-size:14px;">${room.name}</td></tr>
              <tr style="border-top:1px solid #f0e8e0;"><td style="padding:8px 0;color:#7a7a9a;font-size:14px;">Check-In</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;font-size:14px;">${formatDate(booking.checkIn)}</td></tr>
              <tr style="border-top:1px solid #f0e8e0;"><td style="padding:8px 0;color:#7a7a9a;font-size:14px;">Check-Out</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;font-size:14px;">${formatDate(booking.checkOut)}</td></tr>
              <tr style="border-top:1px solid #f0e8e0;"><td style="padding:8px 0;color:#7a7a9a;font-size:14px;">Duration</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;font-size:14px;">${nights} night${nights > 1 ? 's' : ''}</td></tr>
              <tr style="border-top:1px solid #f0e8e0;"><td style="padding:8px 0;color:#7a7a9a;font-size:14px;">Guests</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;font-size:14px;">${booking.guests}</td></tr>
              <tr style="border-top:1px solid #f0e8e0;"><td style="padding:8px 0;color:#7a7a9a;font-size:14px;">Amount Paid</td><td style="padding:8px 0;color:#D4854A;font-weight:700;font-size:16px;">₹${booking.totalAmount?.toLocaleString('en-IN')}</td></tr>
            </table>
          </div>

          ${booking.specialRequests ? `
          <div style="background:#f0f7ff;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;color:#1E6FA8;font-size:14px;"><strong>Special Requests:</strong> ${booking.specialRequests}</p>
          </div>` : ''}

          <!-- Contact Info -->
          <div style="border-top:1px solid #f0f0f0;padding-top:24px;margin-top:8px;">
            <p style="color:#555;font-size:14px;margin:0 0 8px;">For any queries reach us at:</p>
            <p style="color:#1A1A2E;font-size:14px;margin:0;">📞 <strong>+91 98765 43210</strong></p>
            <p style="color:#1A1A2E;font-size:14px;margin:4px 0 0;">💬 WhatsApp us for quick responses</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f7f8fc;padding:20px 32px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#7a7a9a;font-size:12px;margin:0;">Shore & Sip · Om Beach Road, Gokarna, Karnataka 581326</p>
          <p style="color:#7a7a9a;font-size:12px;margin:4px 0 0;">See you at the beach! 🏖️</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await getTransporter().sendMail({
    from: `"Shore & Sip Gokarna" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `✅ Booking Confirmed — ${room.name} | Shore & Sip Gokarna`,
    html,
  });
};

// Admin notification email
export const sendAdminNotification = async (booking, room) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family:Arial,sans-serif;padding:24px;background:#f7f8fc;">
      <div style="max-width:500px;margin:0 auto;background:white;border-radius:12px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <h2 style="color:#1A1A2E;margin:0 0 16px;">🏨 New Booking Received</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#7a7a9a;width:35%;">Guest</td><td style="padding:8px 0;color:#1A1A2E;font-weight:600;">${booking.name}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Email</td><td style="padding:8px 0;color:#1A1A2E;">${booking.email}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Phone</td><td style="padding:8px 0;color:#1A1A2E;">${booking.phone}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Room</td><td style="padding:8px 0;color:#1A1A2E;">${room.name}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Check-In</td><td style="padding:8px 0;color:#1A1A2E;">${new Date(booking.checkIn).toLocaleDateString('en-IN')}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Check-Out</td><td style="padding:8px 0;color:#1A1A2E;">${new Date(booking.checkOut).toLocaleDateString('en-IN')}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Guests</td><td style="padding:8px 0;color:#1A1A2E;">${booking.guests}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Amount</td><td style="padding:8px 0;color:#D4854A;font-weight:700;font-size:16px;">₹${booking.totalAmount?.toLocaleString('en-IN')}</td></tr>
          <tr style="border-top:1px solid #f0f0f0;"><td style="padding:8px 0;color:#7a7a9a;">Payment</td><td style="padding:8px 0;"><span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:9999px;font-weight:600;">PAID</span></td></tr>
        </table>
        ${booking.specialRequests ? `<div style="margin-top:16px;background:#fff8f2;border-radius:8px;padding:12px;font-size:14px;color:#555;"><strong>Special Requests:</strong> ${booking.specialRequests}</div>` : ''}
        <p style="margin:20px 0 0;font-size:12px;color:#7a7a9a;">Booking ID: ${booking._id}</p>
      </div>
    </body>
    </html>
  `;

  await getTransporter().sendMail({
    from: `"Shore & Sip Bookings" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🏨 New Booking: ${booking.name} — ${room.name}`,
    html,
  });
};
