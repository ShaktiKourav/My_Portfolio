# 🚀 Shakti Kourav — Developer Portfolio

A modern, responsive developer portfolio built with **React + Vite** on the frontend and **Express.js + MongoDB Atlas** on the backend.

The portfolio includes a public-facing website, protected admin dashboard, dynamic portfolio content, project management, skills, experience, certificates, online platforms, and a contact messaging system.

---

## 🌐 Live Portfolio

**Portfolio:**
https://your-project.vercel.app

**Admin Dashboard:**
https://your-project.vercel.app/admin

**API Health Check:**
https://your-project.vercel.app/api/health

> Replace `your-project.vercel.app` with your actual Vercel deployment URL after deployment.

---

## 👨‍💻 About

**Shakti Kourav**

Computer Science Student · Problem Solver · Full-Stack Developer

B.Tech — Computer Science
Rajiv Gandhi Proudyogiki Vishwavidyalaya

The portfolio is designed to present projects, technical skills, experience, certifications, education, online profiles, and contact information through a clean and responsive interface.

---

## ✨ Features

* ⚡ React + Vite frontend
* 🎨 Responsive modern portfolio UI
* 🔐 Protected admin dashboard
* 🛡️ JWT-based authentication
* 👤 Dynamic profile management
* 💻 Project management
* 🧩 Skills and technology management
* 💼 Experience management
* 🏆 Certificate management
* 🌐 Online platform/profile management
* 📩 Contact/message management
* 🖼️ Image upload support
* 📄 PDF/document upload support
* 🗄️ MongoDB Atlas database
* 📦 MongoDB GridFS for file storage
* 🔄 Dynamic content loading from API
* 📱 Mobile responsive design
* 🚀 Vercel deployment support
* 🔌 Express REST API
* 🔒 Environment-variable based configuration

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| React.js     | User interface                        |
| Vite         | Development and production build tool |
| JavaScript   | Application logic                     |
| CSS          | Styling and responsive design         |
| Lucide React | UI icons                              |
| React Icons  | Social and technology icons           |

### Backend

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| Node.js       | Backend runtime            |
| Express.js    | REST API                   |
| MongoDB       | Database                   |
| MongoDB Atlas | Cloud database             |
| GridFS        | Image and PDF storage      |
| JWT           | Authentication             |
| CORS          | Cross-origin communication |
| dotenv        | Environment configuration  |

### Deployment

| Technology    | Purpose                                |
| ------------- | -------------------------------------- |
| Vercel        | Frontend and serverless API deployment |
| GitHub        | Source code and version control        |
| MongoDB Atlas | Cloud database                         |

---

## 🏗️ Project Architecture

The portfolio follows an admin-to-API-to-database architecture:

```text
                    ┌─────────────────────┐
                    │      Visitor        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite      │
                    │   Public Portfolio  │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │ Express.js API      │
                    │ /api/*              │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │ MongoDB Atlas    │   │ MongoDB GridFS   │
          │ Portfolio Data   │   │ Images / PDFs    │
          └──────────────────┘   └──────────────────┘
```

The admin dashboard uses the same API to manage published portfolio content.

---

## 📂 Project Structure

```text
My_Portfolio/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── api.js
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── ...
│   └── server.js
│
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── README.md
```

---

# 🚀 Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/ShaktiKourav/My_Portfolio.git
cd My_Portfolio
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root.

```env
MONGODB_URI=your-mongodb-atlas-connection-string

JWT_SECRET=your-long-random-secret

JWT_EXPIRES_IN=7d

ADMIN_EMAIL=your-admin-email

ADMIN_PASSWORD=your-admin-password

CLIENT_URL=http://localhost:5173
```

> Never commit `.env` or other secret credentials to GitHub.

---

## 4. Start the API

Open the first terminal:

```bash
npm run api
```

The API runs at:

```text
http://localhost:5000
```

---

## 5. Start the frontend

Open another terminal:

```bash
npm run dev
```

The portfolio runs at:

```text
http://localhost:5173
```

Admin dashboard:

```text
http://localhost:5173/admin
```

API health check:

```text
http://localhost:5000/api/health
```

---

# 🔐 Admin Dashboard

The portfolio contains a protected admin dashboard for managing public portfolio content.

The admin can manage:

* Profile
* Projects
* Skills
* Experience
* Certificates
* Platforms
* Uploaded images
* Uploaded PDF documents
* Contact messages

Authentication is handled using JWT-based authorization.

The public portfolio retrieves published information through the Express API.

---

# 🗄️ Database

The project uses **MongoDB Atlas** as the cloud database.

Portfolio information is stored in MongoDB, while uploaded images and PDF documents are stored using **MongoDB GridFS**.

Typical content includes:

```text
Profile
Projects
Skills
Experience
Certificates
Platforms
Messages
Users / Admin
```

---

# 📦 File Uploads

The application supports image and PDF uploads.

Uploaded files are stored through MongoDB GridFS.

For Vercel serverless deployment, individual image/PDF uploads are limited to approximately **4 MB** to stay within the platform request payload limit.

---

# 🌍 Deploy to Vercel

The project is designed so that the **React frontend and Express API can be deployed together in a single Vercel project**.

## 1. Push the project to GitHub

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

## 2. Import the repository into Vercel

Open Vercel and select:

```text
Add New
   ↓
Project
   ↓
Import Git Repository
```

Select:

```text
ShaktiKourav/My_Portfolio
```

---

## 3. Build settings

Use the Vite build configuration:

```text
Framework Preset: Vite

Build Command:
npm run build

Output Directory:
dist
```

---

## 4. Add Vercel environment variables

Add these variables in the Vercel project settings:

```env
MONGODB_URI=your-mongodb-atlas-connection-string

JWT_SECRET=a-long-random-secret

JWT_EXPIRES_IN=7d

ADMIN_EMAIL=your-admin-email

ADMIN_PASSWORD=your-admin-password

CLIENT_URL=https://your-project.vercel.app
```

Configure them for:

```text
Production
Preview
Development
```

Do not store these credentials in GitHub.

---

## 5. Deploy

Click:

```text
Deploy
```

After deployment, Vercel will provide the production URL.

For example:

```text
https://my-portfolio.vercel.app
```

Update:

```env
CLIENT_URL=https://my-portfolio.vercel.app
```

and redeploy if necessary.

---

# 🧪 Production API Test

After deployment, test:

```text
https://your-project.vercel.app/api/health
```

A successful deployment should return the API health response.

You can also test the portfolio endpoints from the deployed frontend.

---

# 🌐 MongoDB Atlas Configuration

For the deployed Vercel serverless API to connect to MongoDB Atlas, configure the appropriate network access in MongoDB Atlas.

For initial Vercel deployment, many setups use:

```text
0.0.0.0/0
```

in MongoDB Atlas Network Access.

> Restrict database network access further whenever your production infrastructure allows it.

---

# 🔒 Security

The following values must remain private:

```text
MONGODB_URI
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
```

Do not commit:

```text
.env
.env.local
node_modules/
dist/
.vercel/
```

The repository should contain only configuration examples, never real passwords or database credentials.

---

# 📱 Responsive Design

The portfolio is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The UI adapts navigation, cards, sections, forms, and content layouts for smaller screens.

---

# 📌 Main Portfolio Sections

### Home

Introduction, profile image, headline, bio, social links and primary portfolio actions.

### About

Profile information, education, focus and location.

### Skills

Published technical skills with categories and proficiency information.

### Projects

Projects with:

* Project image
* Description
* Technologies
* GitHub repository
* Live demo
* Project details

### Experience

Published experience and development milestones.

### Explore

Contains:

* Certificates
* Online platforms
* External profiles

### Contact

Visitors can send messages through the portfolio contact form.

---

# 🔄 Dynamic Content

The public portfolio does not depend on hard-coded project, skill, certificate or experience content.

Content is retrieved from the backend API.

```text
Admin Dashboard
       │
       ▼
Express API
       │
       ▼
MongoDB Atlas
       │
       ▼
Public Portfolio
```

This allows portfolio content to be updated from the admin dashboard without manually changing the frontend source code.

---

# 📜 License

This project is a personal developer portfolio created by **Shakti Kourav**.

All personal information, portfolio content, project descriptions, images and documents belong to their respective owner.

---

# 👨‍💻 Author

## Shakti Kourav

**Computer Science Student · Problem Solver · Full-Stack Developer**

* GitHub: https://github.com/ShaktiKourav
* LeetCode: https://leetcode.com/u/Shakti_kourav/

---

<div align="center">

### ⭐ Built with React, Node.js, Express and MongoDB

**© 2026 Shakti Kourav**

</div>
