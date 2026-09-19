# MERN Portfolio: implementation structure

## Objective

Create a public portfolio that always displays the latest published content and a private admin dashboard that only Satyam can use to manage it.

## Architecture

```text
React + Vite public website and /admin dashboard
                     |
                     | HTTPS REST API
                     v
Node.js + Express API
  |- JWT authentication and role checks
  |- input validation and error handling
  |- Cloudinary upload integration
                     |
                     v
MongoDB Atlas
  |- profile, projects, skills, certificates
  |- experience, messages, users
```

## Repository layout

```text
Shakti-Portfolio/
  src/                         # React client
    components/                # public UI components
    pages/
      admin/                   # protected dashboard screens
    services/                  # API client functions
    context/                   # auth state and protected-route logic
  server/
    config/                    # MongoDB and Cloudinary configuration
    controllers/               # request handling
    middleware/                # auth, validation, upload, error handling
    models/                    # Mongoose schemas
    routes/                    # API endpoints
    utils/                     # token and async helpers
    app.js                     # Express configuration
    server.js                  # API bootstrap
  docs/
    MERN_PORTFOLIO_PLAN.md
  .env.example                 # required environment variable names only
```

## MongoDB collections

| Collection | Main fields |
|---|---|
| users | name, email, passwordHash, role |
| profile | name, headline, bio, photo, resumeUrl, social links |
| projects | title, slug, description, technologies, image, GitHub/live URLs, published, featured |
| skills | name, category, proficiency, icon, order |
| certificates | title, issuer, issuedDate, credentialUrl, fileUrl, imageUrl, published |
| experiences | role, organisation, startDate, endDate, description, technologies, order |
| messages | name, email, message, status, createdAt |

## Access rules

| Action | Public visitor | Admin (Satyam) |
|---|---:|---:|
| View published content | Yes | Yes |
| Send contact message | Yes | Yes |
| View all messages | No | Yes |
| Add/edit/delete portfolio data | No | Yes |
| Upload images/certificates/resume | No | Yes |
| Publish/unpublish content | No | Yes |

## API design

### Public

```text
GET  /api/profile
GET  /api/projects
GET  /api/skills
GET  /api/certificates
GET  /api/experiences
POST /api/contact
```

### Admin (JWT required)

```text
POST /api/auth/login
GET  /api/auth/me

PATCH /api/admin/profile
GET/POST/PATCH/DELETE /api/admin/projects
GET/POST/PATCH/DELETE /api/admin/skills
GET/POST/PATCH/DELETE /api/admin/certificates
GET/POST/PATCH/DELETE /api/admin/experiences
GET /api/admin/messages
PATCH /api/admin/messages/:id
POST /api/uploads
```

## Build phases

1. **Foundation** — Express API, MongoDB connection, environment config, common error handling.
2. **Security** — one admin account, password hashing, JWT middleware, protected routes.
3. **Content API** — models and CRUD for profile, projects, skills, certificates, and experience.
4. **Uploads** — Cloudinary integration for profile photo, project images, certificates, and resume.
5. **Admin dashboard** — login, overview, content tables, add/edit forms, publish controls, inbox.
6. **Public integration** — replace local fallback data with live APIs and loading/error states.
7. **Production readiness** — validation, rate limiting, CORS, deployment configuration, tests.

## Required accounts before deployment

- MongoDB Atlas database
- Cloudinary media account
- Vercel account for the React site
- Render or Railway account for the Node/Express API

## Environment variables

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

`ADMIN_PASSWORD` will only be used once to seed the first administrator, then stored as a bcrypt hash. Never commit real values to Git.
