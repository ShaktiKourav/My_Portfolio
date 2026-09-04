## Run locally

This portfolio uses React/Vite on the frontend and an Express + MongoDB Atlas API. Images and PDFs are stored in MongoDB GridFS.

```bash
npm run api
```

In another terminal:

```bash
npm run dev
```

The website runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Deploy: Vercel frontend + API (no separate backend host)

The project includes a Vercel Serverless Function that runs the Express API at `/api/*`. Your React site, protected admin dashboard, GridFS uploads, and MongoDB-backed data all deploy together in one Vercel project.

1. Push the latest code to GitHub.
2. In [Vercel](https://vercel.com), select **Add New → Project** and import this GitHub repository.
3. Keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add these Vercel environment variables for **Production, Preview, and Development**. Do not add these to GitHub:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=a-long-random-secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
CLIENT_URL=https://your-project.vercel.app
```

5. Deploy. After Vercel provides the final URL, set `CLIENT_URL` to that exact URL and redeploy once.
6. In MongoDB Atlas Network Access, allow `0.0.0.0/0` for Vercel's serverless network. Restrict it later where possible.

Your public site is the Vercel URL, the protected content dashboard is `https://your-project.vercel.app/admin`, and the API health check is `https://your-project.vercel.app/api/health`.

Vercel Functions accept a maximum request payload of 4.5 MB, so the portfolio intentionally limits each image or PDF upload to 4 MB.

---

<div align="center">

<h1>⚡ Futuristic 3D Portfolio</h1>

<p>
  A premium cyberpunk-inspired developer portfolio with glassmorphism UI, cinematic glow effects, animated backgrounds, and modern React interactions.
</p>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8" />
<img src="https://img.shields.io/badge/Framer_Motion-111827?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-020617?style=for-the-badge&logo=vite&logoColor=FFD62E" />

</div>

---

<h2>🌌 About The Portfolio</h2>

<p>
This portfolio is designed to create a futuristic and premium web experience.  
It combines cinematic visuals, neon electric green lighting, glassmorphism cards, animated grids, glowing particles, smooth transitions, and modern UI sections.
</p>

---

<h2>✨ Key Features</h2>

<table>
  <tr>
    <td>⚡ Futuristic Hero Section</td>
    <td>🌌 Animated Sci-Fi Background</td>
  </tr>
  <tr>
    <td>💎 Glassmorphism UI</td>
    <td>🟢 Neon Electric Green Theme</td>
  </tr>
  <tr>
    <td>🎯 Dynamic Typing Animation</td>
    <td>🧊 Holographic Cards</td>
  </tr>
  <tr>
    <td>🚀 Animated Project Cards</td>
    <td>📈 Premium Timeline Section</td>
  </tr>
  <tr>
    <td>🖱️ Custom Cursor Glow</td>
    <td>📱 Fully Responsive Design</td>
  </tr>
</table>

---

<h2>🧩 Portfolio Sections</h2>

<ul>
  <li><b>Hero:</b> Futuristic intro with dynamic role animation and glowing CTA buttons.</li>
  <li><b>About:</b> Premium about section with animated count-up stats.</li>
  <li><b>Skills:</b> Hexagon glass cards with real technology icon colors.</li>
  <li><b>Projects:</b> Sci-fi project cards with scan-line and holographic effects.</li>
  <li><b>Experience:</b> Animated timeline with glowing nodes and glass cards.</li>
  <li><b>Contact:</b> Premium contact form with social icons and glowing focus states.</li>
</ul>

---

<h2>🛠️ Tech Stack</h2>

<table>
  <tr>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td>React.js</td>
    <td>Frontend UI</td>
  </tr>
  <tr>
    <td>Vite</td>
    <td>Fast development build tool</td>
  </tr>
  <tr>
    <td>Tailwind CSS</td>
    <td>Modern styling</td>
  </tr>
  <tr>
    <td>Framer Motion</td>
    <td>Animations and transitions</td>
  </tr>
  <tr>
    <td>React Icons</td>
    <td>Technology and social icons</td>
  </tr>
  <tr>
    <td>React Type Animation</td>
    <td>Dynamic typing effect</td>
  </tr>
</table>

---

<h2>🎨 Design Highlights</h2>

<ul>
  <li>Cyberpunk-inspired visual language</li>
  <li>Neon green glow system</li>
  <li>Animated asymmetric grid background</li>
  <li>Diagonal glowing crack-line effects</li>
  <li>Soft cinematic glow blobs</li>
  <li>Premium glassmorphism navbar and cards</li>
  <li>Custom glowing scrollbar and text selection</li>
</ul>

---

<h2>📂 Folder Structure</h2>

<pre>
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Background.jsx
│   ├── CursorGlow.jsx
│   └── MouseGlow.jsx
│
├── assets/
│
├── App.jsx
├── main.jsx
└── index.css
</pre>

---

<h2>🚀 Future Enhancements</h2>

<ul>
  <li>Real project screenshots and preview videos</li>
  <li>Live demo and GitHub links for each project</li>
  <li>Three.js based interactive 3D models</li>
  <li>EmailJS or Formspree contact form integration</li>
  <li>Dark/light futuristic theme switcher</li>
  <li>Interactive terminal-style section</li>
</ul>

---

<h2>👨‍💻 Author</h2>

<h3>Satyam Kushwaha</h3>

<p>
Aspiring Software Engineer • Full Stack Developer • Futuristic UI Designer
</p>

<p>
  <a href="https://github.com/SatyamKushwaha3232">
    <img src="https://img.shields.io/badge/GitHub-SatyamKushwaha3232-181717?style=for-the-badge&logo=github" />
  </a>
</p>

---

<div align="center">

<h3>⭐ If you like this portfolio, give it a star!</h3>

<p>Made with ❤️ using React, Tailwind CSS and Framer Motion</p>

</div>
