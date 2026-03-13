# 🌊 Shore & Sip - Beach Resort Management System

Shore & Sip is a comprehensive MERN stack application designed for a luxury beach resort in Gokarna. It provides a seamless experience for guests to book rooms and browse the cafe menu, while offering a powerful administration dashboard for managing resort operations.

## ✨ Features

### 🏨 Guest Experience
- **Room Booking:** Browse rooms (Ocean View, Garden Retreat, etc.) and check availability.
- **Razorpay Integration:** Secure online payments for bookings.
- **Cafe Menu:** Digital menu for the Shore & Sip cafe.
- **Reviews:** Guest feedback system with ratings and comments.
- **Responsive Design:** Optimized for mobile and desktop devices.

### 🛠 Admin Dashboard
- **Room Management:** Create, update, and delete room listings with image uploads.
- **Booking Management:** Track and manage guest reservations.
- **Menu Management:** Update cafe menu items and pricing.
- **Review Moderation:** Approve or delete guest reviews.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Razorpay Account (for payments)

### 1. Installation
Clone the repository and install dependencies in the root directory:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
```

### 3. Database Seeding (Optional)
To populate the database with sample rooms, menu items, and admin user:
```bash
cd server
node seeder.js
```
**Default Admin:** `admin@shoreandsip.in` / `Admin@123`

### 4. Running the App
Run both client and server concurrently from the root directory:
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 🛠 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Payments:** Razorpay
- **Auth:** JSON Web Tokens (JWT), BcryptJS

## 📄 License
ISC
