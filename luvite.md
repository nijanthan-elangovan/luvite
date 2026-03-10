# Luvite Knowledge Base (`luvite.md`)

Last updated: 2026-03-11
Owner: Luvite engineering

## Purpose
This file is the single source of truth for:
- Consistency across contributors and AI agents
- Fast knowledge transfer (KT)
- Tracking architectural decisions and major changes
- Preventing regressions from undocumented edits

## Mandatory Workflow
Before editing any code:
1. Read this file fully.
2. Check **Current Architecture**, **Data Model**, and **Known Constraints**.
3. Confirm your change aligns with the existing patterns.

After every meaningful change:
1. Update **Change Log** with date, files touched, and behavior impact.
2. Update relevant sections (APIs, env vars, routes, schema) if changed.
3. Run `npm run build` and record important warnings/errors.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Puck Editor (`@puckeditor/core`) for drag-drop invite builder
- MySQL (`mysql2/promise`)
- Framer Motion for animations

## Core Product Flow
1. User logs in/registers.
2. User opens `/editor` and builds an invitation in Puck.
3. User publishes with a slug.
4. Invitation JSON is stored in `invitations.data` and owned by `user_id`.
5. Public render happens at subdomain (`{slug}.luvite.fun`) via middleware rewrite to `/invite/[slug]`.
6. RSVP submissions are stored and linked to invitation owner for profile analytics.

## Current Route Map (Important)
- Public:
  - `/` landing
  - `/invite/[slug]` invite render page (server-fetches from DB)
  - subdomain rewrite: `{slug}.luvite.fun` -> `/invite/{slug}`
- Auth/UI:
  - `/login`
  - `/editor` (protected)
  - `/profile` (protected)
- APIs:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
  - `GET|POST|DELETE /api/invitations`
  - `POST /api/rsvps`
  - `GET /api/profile`

## Auth Model
File: `src/lib/auth.ts`
- Cookie: `luvite_auth` (HTTP-only)
- Token: custom HMAC SHA-256 signed payload (`userId`, `email`, `name`, `exp`)
- Password hashing: `scrypt` + random salt
- TTL: 14 days

## Database Model
### `users`
- `id` (PK)
- `name`
- `email` (unique)
- `password_hash`
- `created_at`, `updated_at`

### `invitations`
- `slug` (PK)
- `data` (JSON, Puck payload)
- `user_id` (owner)
- `created_at`, `updated_at`

### `rsvps`
- `id` (PK)
- `invitation_slug`
- `owner_user_id` (derived from invitation owner)
- `name`, `email`, `attending`, `meal`, `message`, `source_path`
- `created_at`

## Editor & Rendering Notes
Files:
- Editor UI: `src/app/editor/page.tsx`
- Puck config: `src/lib/puck.config.tsx`
- Invite render: `src/app/invite/[slug]/page.tsx` + `InviteClient.tsx`

Important:
- Editor is `/editor` (not `/admin`).
- Puck default header is used (custom top utility bar is separate).
- Invite page does server-side DB fetch for published JSON.
- `InviteClient.tsx` inlines `zones` into slot props before `Render` to keep slot components consistent after publish.

## Metadata & Domain
Files:
- `src/app/layout.tsx`
- `src/app/invite/[slug]/page.tsx`

Defaults:
- `NEXT_PUBLIC_SITE_URL` fallback: `https://luvite.fun`
- `NEXT_PUBLIC_ROOT_DOMAIN` fallback in editor publish link: `luvite.fun`

OG/Twitter:
- Global metadata exists
- Dynamic invite metadata generated from invitation content where possible

## Middleware / Subdomain Rewrites
File: `src/proxy.ts`
- Protects `/editor` and `/profile` by checking `luvite_auth` cookie.
- Rewrites non-main domains to `/invite/{slug}`.
- Main domains currently include both `.fun` and `.in` entries for compatibility.

## Required Environment Variables
- `DB_HOST`
- `DB_USER`
- `DB_PASS`
- `DB_NAME`
- `AUTH_SECRET` (must be set in production)
- `NEXT_PUBLIC_SITE_URL` (recommended: `https://luvite.fun`)
- `NEXT_PUBLIC_ROOT_DOMAIN` (recommended: `luvite.fun`)

## Known Constraints / Risks
- Build warning: multiple `package-lock.json` detected one level above project; Next infers workspace root from parent.
- `src/lib/auth.ts` has a dev fallback secret; production must override with strong `AUTH_SECRET`.
- Main domain list in middleware still includes `.in`; keep or remove intentionally.

## Definition of Done for Any Feature
- Builds successfully: `npm run build`
- Route/API behavior validated for auth and ownership
- No breaking changes to invite rendering
- `luvite.md` updated with what changed

## Change Log
### 2026-03-10
- Added account system with login/register/logout/session token.
- Restricted invitation create/update/delete to authenticated owners.
- Added profile API/page listing user invitations and RSVPs.
- Added DB-backed RSVP persistence with invitation-owner linkage.
- Added Puck categories/widgets and animation wrapper/parallax support.
- Added OG/Twitter metadata and theme color; dynamic invite metadata.
- Fixed editor header issues (publish/menu overflow) by separating custom utility bar.
- Updated domain defaults toward `luvite.fun` and subdomain publish links.
- Fixed published render consistency by server-side invitation fetch and zone inlining in `InviteClient.tsx`.

- Added new inspired template: city-grandeur for premium city-style wedding flow.
- Added new reusable components: CityHero and ScheduleCard.
- Registered both blocks in Puck config/categories and updated city template to use them.
- Enhanced city template visual depth using ParallaxDiorama (multi-layer, scroll-reactive, mouse-hover parallax).
- Added new reusable block: ParallaxDiorama and registered it under Effects & Decor.
- Added ParallaxDiorama block for layered 3D-style hero (scroll + hover parallax + animated reveal + countdown).
- Added PortraitCutout block using @imgly/background-removal for in-browser AI portrait cutouts.
- Updated city-grandeur template to use richer layered hero and premium visual sections.
- Added packages: @imgly/background-removal and onnxruntime-web.

### 2026-03-11
- Fixed build blocker in `PortraitCutout` by switching to named import: `removeBackground` from `@imgly/background-removal`.
- Added object URL cleanup in `PortraitCutout` to avoid memory leaks when regenerating cutouts.
- Refactored `ParallaxDiorama` layer rendering into `ParallaxLayerItem` so Framer hooks are called in valid component scope.
- Verified `npm run build` passes successfully on Next.js 16.1.6.
- Verified no test runner is currently configured (`npm run test` fails with Missing script: `test`).
