# Deployment Guide for Vercel

This project consists of two parts:
1. **Frontend**: A React + Vite application.
2. **Backend**: A Node.js + Express API.

To deploy this correctly on Vercel, you should deploy them as **two separate projects** connected to the same GitHub repository.

## Prerequisites

1. **GitHub Account**: Ensure your code is pushed to GitHub (already done).
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3. **MongoDB Atlas Account**: You need a cloud database. Vercel cannot connect to your local MongoDB.
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas/database).
   - Get your **Connection String** (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/mental-wellness`).

---

## Step 1: Deploy the Backend

1. Log in to your Vercel Dashboard.
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`nabad-nasiino-project`).
4. **Configure the Project**:
   - **Project Name**: `nabad-backend` (or similar).
   - **Framework Preset**: Select **Other** (do not leave it as Vite/Next.js if it auto-detects).
   - **Root Directory**: Click "Edit" and select `backend`.
   - **Environment Variables**: Expand the section and add:
     - `MONGODB_URI`: Your MongoDB Atlas connection string.
     - `JWT_SECRET`: A secure random string (e.g., `mysecretkey123`).
5. Click **Deploy**.
6. Once deployed, copy the **Domain** (e.g., `https://nabad-backend.vercel.app`).

---

## Step 2: Deploy the Frontend

1. Go back to your Vercel Dashboard.
2. Click **"Add New..."** -> **"Project"** (Select the **SAME** GitHub repository again).
3. **Configure the Project**:
   - **Project Name**: `nabad-frontend` (or similar).
   - **Framework Preset**: Select **Vite** (it should auto-detect).
   - **Root Directory**: Click "Edit" and select `frontend`.
   - **Environment Variables**: Expand the section and add:
     - `VITE_API_URL`: The backend URL you copied in Step 1, followed by `/api`.
       - Example: `https://nabad-backend.vercel.app/api`
4. Click **Deploy**.

---

## Step 3: Verify

1. Open your new Frontend URL (e.g., `https://nabad-frontend.vercel.app`).
2. Try to **Register** a new account (this tests the database connection).
3. Try to view **Quotes** (this tests the API connection).

## Troubleshooting

- **CORS Errors**: If you see CORS errors in the browser console, ensure your Backend is running and the URL in `VITE_API_URL` is correct (no trailing slash issues, though the code handles it).
- **Database Errors**: Check your MongoDB Atlas Network Access settings. Ensure you allow access from **Anywhere (0.0.0.0/0)** since Vercel IPs are dynamic.
