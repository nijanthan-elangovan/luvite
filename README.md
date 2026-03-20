# Luvite

A luxury digital invitation platform for creating stunning, interactive e-invitations for weddings and events. Built with Next.js and featuring a drag-and-drop visual editor, 3D parallax effects, AI-powered portrait processing, and RSVP management.

**Live at [luvite.fun](https://luvite.fun)**

## Features

- **Visual Drag-and-Drop Editor** — Build invitations with a Puck-powered block editor. No coding required.
- **3D Parallax Effects** — Multi-layer parallax hero sections and diorama effects with scroll and hover interactions.
- **AI Portrait Cutout** — Automatically remove portrait backgrounds using on-device AI (ONNX Runtime + IMGLY).
- **Interactive Components** — Countdown timers, animated timelines, floating hearts/petals, photo galleries, and more.
- **RSVP Management** — Embedded RSVP forms with guest tracking and a dashboard to view responses.
- **Template System** — Pre-built wedding templates to start from, fully customizable in the editor.
- **Custom Subdomain Sharing** — Each invitation gets a unique URL like `your-name.luvite.fun`.
- **Background Music** — Add audio with autoplay handling and playback controls.
- **Google Maps Integration** — Embed venue locations directly in invitations.
- **Mobile Responsive** — All invitations are fully responsive out of the box.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4 |
| Editor | Puck Editor |
| Animations | Framer Motion |
| AI Processing | IMGLY Background Removal, ONNX Runtime |
| Database | MySQL |
| Auth | HMAC-SHA256 token-based (custom) |
| Deployment | GitHub Actions, SSH + rsync, PM2 |

## Getting Started

### Prerequisites

- Node.js 22+
- MySQL 5.7+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/luvite.git
cd luvite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values
```

### Database Setup

Create a MySQL database and user:

```sql
CREATE DATABASE luvite;
CREATE USER 'luvite'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON luvite.* TO 'luvite'@'localhost';
FLUSH PRIVILEGES;
```

The app will auto-create tables on first run.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host (default: `localhost`) |
| `DB_USER` | MySQL username (default: `luvite`) |
| `DB_PASS` | MySQL password (**required**) |
| `DB_NAME` | MySQL database name (default: `luvite`) |
| `AUTH_SECRET` | Secret key for signing auth tokens (**required** — use a long random string) |
| `NEXT_PUBLIC_SITE_URL` | Base URL of the app |
| `NEXT_PUBLIC_ROOT_DOMAIN` | Root domain for subdomain routing |

### Running Locally

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Landing page
│   ├── login/                  # Authentication
│   ├── editor/                 # Puck drag-and-drop editor
│   ├── profile/                # User dashboard & RSVP tracking
│   ├── templates/              # Template gallery
│   ├── invite/[slug]/          # Public invitation viewer
│   └── api/                    # REST API routes
│       ├── auth/               # Register, login, logout, session
│       ├── invitations/        # CRUD for invitations
│       ├── rsvps/              # RSVP submissions
│       └── profile/            # User profile data
├── components/blocks/          # Editor building blocks
│   ├── Hero3D.tsx              # 3D parallax hero
│   ├── ParallaxDiorama.tsx     # Multi-layer parallax
│   ├── PortraitCutout.tsx      # AI background removal
│   ├── InteractiveTimeline.tsx # Scroll-triggered timeline
│   ├── Countdown.tsx           # Animated countdown
│   ├── RSVPForm.tsx            # Guest RSVP form
│   ├── FloatingHearts.tsx      # Particle animations
│   ├── PhotoGallery.tsx        # Image carousel
│   ├── AudioEngine.tsx         # Background music
│   ├── GoogleMap.tsx           # Venue map embed
│   └── ...                     # More blocks
├── lib/
│   ├── auth.ts                 # Authentication & token signing
│   ├── db.ts                   # MySQL connection pool
│   ├── puck.config.tsx         # Editor component registry
│   ├── templates.ts            # Pre-built templates
│   └── utils.ts                # Utilities
└── proxy.ts                    # Auth middleware & subdomain routing
```

## Editor Blocks

The visual editor includes these drag-and-drop components:

| Block | Description |
|-------|-------------|
| Hero3D | Hero section with 3D parallax layers |
| ParallaxDiorama | Multi-layer scroll + hover parallax |
| PortraitCutout | AI-powered portrait background removal |
| InteractiveTimeline | Scroll-animated event timeline |
| Countdown | Live countdown to the event date |
| RSVPForm | Guest response form with meal preferences |
| FloatingHearts / FloatingPetals | Animated particle decorations |
| AudioEngine | Background music player |
| PhotoGallery | Image carousel / gallery |
| EventCard | Event details card |
| ScheduleCard | Event schedule display |
| QuoteBlock | Styled quote / testimonial |
| GoogleMap | Embedded Google Maps |
| AnimationWrapper | Fade, slide, and scale animations |
| FontLoader | Custom Google Fonts |

## API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Get current user |

### Invitations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invitations?slug=xxx` | Fetch invitation by slug |
| POST | `/api/invitations` | Create / publish invitation |
| PUT | `/api/invitations` | Update invitation |
| DELETE | `/api/invitations?slug=xxx` | Delete invitation |

### RSVPs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rsvps` | Submit RSVP |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get user dashboard data |

## Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys on push to `master`/`main`:

1. Builds with Node.js 22
2. Deploys via SSH + rsync to `/opt/luvite/`
3. Restarts with PM2
4. Runs a health check

**Required GitHub Secrets:**
- `SSH_PRIVATE_KEY` — Private SSH key for deployment server
- `SSH_HOST` — Server hostname
- `SSH_USER` — SSH username

## License

MIT
