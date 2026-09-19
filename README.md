# Shakti Kourav — Portfolio

A modern and responsive developer portfolio built with **React, Vite, Express.js and MongoDB Atlas**.

The portfolio includes a public website, admin dashboard, dynamic projects, skills, experience, certificates and contact management.

## ✨ Features

* Modern responsive UI
* Smooth animations and visual effects
* Dynamic portfolio content
* Projects, skills and experience sections
* Certificates and social profiles
* Protected Admin Dashboard
* Contact form
* MongoDB Atlas database
* GridFS for image and PDF storage
* Vercel deployment support

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Storage:** MongoDB GridFS
* **Authentication:** JWT
* **Icons:** Lucide React, React Icons
* **Deployment:** Vercel

## 🚀 Run Locally

Install dependencies:

```bash
npm install
```

Start the API:

```bash
npm run api
```

In another terminal:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

API:

```text
http://localhost:5000
```

## 🔐 Environment Variables

Create a `.env` file and add:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
CLIENT_URL=http://localhost:5173
```

Do not upload `.env` to GitHub.

## ☁️ Deploy on Vercel

The frontend and Express API can be deployed together using Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Use:

```text
Build Command: npm run build
Output Directory: dist
```

4. Add the required environment variables in Vercel.
5. Deploy the project.
6. Configure MongoDB Atlas network access for the deployed application.

After deployment:

```text
Website:
https://your-project.vercel.app

Admin:
https://your-project.vercel.app/admin

API:
https://your-project.vercel.app/api/health
```

## 📂 Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── assets/
└── App.jsx

server/
├── models/
├── routes/
└── server.js
```

## 👨‍💻 Author

**Shakti Kourav**

Computer Science Student · Problem Solver · Full-Stack Developer

GitHub: [ShaktiKourav](https://github.com/ShaktiKourav)

LeetCode: [Shakti Kourav](https://leetcode.com/u/Shakti_kourav/)

---

⭐ Built with React, Vite, Express.js and MongoDB.
