# Kappala Chiranjeeva — The Series

A cinematic, streaming-style portfolio: a **React + TypeScript** frontend served by a **Spring Boot (Java 17)** backend.
Every section is an episode and every project is an "Original". Not affiliated with any streaming service.

```
chiranjeeva-portfolio/
├── backend/                         Spring Boot 3.3 (Maven)
│   ├── src/main/java/…/api          GET /api/portfolio, /api/health, admin endpoints
│   ├── src/main/java/…/contact      POST /api/contact (validation, rate limit, H2 storage, optional email)
│   └── src/main/resources
│       ├── portfolio.json           the content the API serves (generated from portfolio.ts)
│       └── static/                  the built React site (already included)
├── frontend/                        React 18 + Vite + Tailwind 4 + Framer Motion
│   └── src/data/portfolio.ts        ← all your content lives here
└── Dockerfile                       one-command build + run
```

## Run it

Needs **Java 17+** and **Maven 3.9+** (or open `backend/` in IntelliJ / VS Code and run `PortfolioApplication`).

```bash
cd backend
mvn spring-boot:run
```

Open http://localhost:8080. The React build is already in `backend/src/main/resources/static`, so no Node is needed to run it.

**Developing the frontend** (hot reload, needs Node 18+): keep the backend running, then

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173 — /api calls are proxied to :8080
```

## Changing your content

Everything on the site comes from **`frontend/src/data/portfolio.ts`**: name, intro, projects, skills, journey, top picks, intro slides.

After editing it:

```bash
cd frontend
npm run export-data   # regenerates backend/src/main/resources/portfolio.json
npm run build         # rebuilds the site into backend/src/main/resources/static
```

Then restart the backend. When the backend is running, the site uses **`portfolio.json`** (served at `/api/portfolio`); if the API can't be reached
(for example `npm run dev` without the backend) it falls back to the data bundled from `portfolio.ts`. So always run `export-data` after editing.

Edit content **without rebuilding**: set `PORTFOLIO_DATA_FILE=/path/to/portfolio.json`; the file is re-read on every request.

### Things you'll probably want to add

| To add | Where (in `portfolio.ts`) |
| --- | --- |
| Your photo (replaces the “KC” monogram) | put it in `frontend/public/assets/`, then set `profile.portrait = { src: '/assets/me.png', alt: '…' }` (transparent PNG/WebP, chest-up works best) |
| LinkedIn button | `profile.links.linkedin` |
| “View certificate” links | `certifications[].link` |
| Project GitHub buttons | `projects[].github` (hidden while empty) |
| Project dates | `projects[].year` (hidden while empty) |
| Work experience / internships | `experience` (the resume section appears automatically) |
| Awards / hackathons | `achievements` (they become the poster cards; certifications move to a rail) |
| Interests chips | `profile.interests` |
| New resume | replace `frontend/public/assets/Kappala_Chiranjeeva_Resume.pdf` |

Your phone number is on the resume PDF but deliberately **not** shown on the site itself.

## Backend API

| Endpoint | What it does |
| --- | --- |
| `GET /api/portfolio` | the portfolio content as JSON |
| `POST /api/contact` | `{name, email, message}` → validated, rate-limited (5/hour/IP), honeypot-protected, saved to the database, optionally emailed |
| `GET /api/admin/messages` | list contact messages — header `X-Admin-Key` |
| `DELETE /api/admin/messages/{id}` | delete one — header `X-Admin-Key` |
| `GET /api/health` | `{"status":"ok"}` |

Messages are stored in an H2 file database in `backend/data/`. Back that folder up (or mount it as a volume) if you deploy.

### Optional configuration (environment variables)

| Variable | Purpose |
| --- | --- |
| `ADMIN_KEY` | enables the admin endpoints (disabled while unset). Use a long random value and HTTPS. |
| `CONTACT_NOTIFY_TO` | your email address; each new message is emailed to it |
| `CONTACT_FROM` | sender address for those emails |
| `SPRING_MAIL_HOST`, `SPRING_MAIL_PORT`, `SPRING_MAIL_USERNAME`, `SPRING_MAIL_PASSWORD` | SMTP server (for Gmail: `smtp.gmail.com`, `587`, an app password, plus `SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true` and `SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true`) |
| `PORTFOLIO_DATA_FILE` | serve content from this file instead of the bundled one |
| `PORT` | HTTP port (default 8080) |

Without mail settings the contact form still works — messages just wait in the database.

```bash
curl -H "X-Admin-Key: $ADMIN_KEY" http://localhost:8080/api/admin/messages
```

## Deploying

GitHub Pages can't run Java. Use any host that runs a container or a JVM (Render, Railway, Fly.io, a VPS):

```bash
docker build -t portfolio .
docker run -p 8080:8080 -v portfolio-data:/app/data -e ADMIN_KEY=change-me portfolio
```

On Render/Railway, point the service at this repo's `Dockerfile`; they set `PORT` for you.

## Tests

```bash
cd backend && mvn test
```

## Credit

The look and the animations are based on the open “Portfolio_series” template. All personal content (name, text, projects, photo, resume) has been replaced.
If you publish this, credit the template's author and check the original repository's licence terms.
