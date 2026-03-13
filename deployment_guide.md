# 🚀 Deployment Guide: Netlify & Render

This guide explains how to deploy the Shore & Sip MERN application. We will deploy the **Backend on Render** and the **Frontend on Netlify**.

---

## 🏗 Part 1: Backend Deployment (Render)

1. **Connect GitHub:** Create a new "Web Service" on [Render](https://render.com/) and connect your GitHub repository.
2. **Configure Service:**
   - **Name:** `shore-and-sip-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
3. **Environment Variables:** Add all variables from your `server/.env` file to Render's "Environment" tab:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A long, random string.
   - `FRONTEND_URL`: `https://shore-and-sip.netlify.app` (Replace with your actual Netlify URL once created).
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, etc.
4. **Deploy:** Render will automatically deploy your backend. Copy the generated URL (e.g., `https://shore-and-sip-backend.onrender.com`).

---

## 🎨 Part 2: Frontend Deployment (Netlify)

1. **Connect GitHub:** Create a new site from Git on [Netlify](https://www.netlify.com/).
2. **Configure Site:**
   - **Base Directory:** `client`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `client/dist`
4. **Environment Variables:** In Netlify "Site settings" > "Environment variables", add:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://shore-and-sip-backend.onrender.com/api`).
5. **SPA Routing:** I have already added a `_redirects` file in `client/public` to handle React Router paths. Netlify will use this automatically to prevent 404 errors on page refresh.
6. **Deploy:** Netlify will build and deploy your site. Note your site's URL and update the `FRONTEND_URL` in your Render backend settings!

---

## ⚠️ Important Production Notes

- **CORS:** Ensure the `FRONTEND_URL` in Render matches your Netlify URL exactly.
- **Database:** Use a hosted MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **IP Whitelist (CRITICAL):** In MongoDB Atlas, you **must** allow access from anywhere (`0.0.0.0/0`) because Render's IP addresses change frequently.
  - Go to **Network Access** in MongoDB Atlas.
  - Click **Add IP Address**.
  - Choose **Allow Access from Anywhere**.
- **Environment Refresh:** If you change environment variables, you may need to "Redeploy" or "Restart" the services on both platforms.
