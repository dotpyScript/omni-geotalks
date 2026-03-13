# 🏗️ CODEBASE ARCHITECTURE DIAGRAM & DATA FLOW

## Application Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     IEGS Webinar Platform                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐                          ┌──────────────────┐
│                     │                          │                  │
│   PUBLIC ROUTES     │                          │  ADMIN ROUTES    │
│   (/src/app)        │                          │  (/src/app/admin)│
│                     │                          │                  │
│  ✓ /               │◄──────────────────────►│  ✓ /admin        │ (new)
│  ✓ /webinars       │   Protected Routes      │  ✓ /admin/auth   │ (new)
│  ✓ /webinars/[id] │                          │  ✓ /admin/dash   │ (new)
│  ✓ /speakers/[id] │                          │  ✓ /admin/web... │ (new)
│                     │                          │  ✓ /admin/spk... │ (new)
└─────────────────────┘                          │  ✓ /admin/reg... │ (new)
       ▲                                         │  ✓ /admin/ana... │ (new)
       │                                         └──────────────────┘
       │                                                   ▲
       │                                                   │
       │                                         JWT Auth Middleware
       │                                                   │
    Layout.tsx                                            │
       │                                    ┌──────────────────────┐
       ├─ Navbar                           │   /api/auth (new)    │
       ├─ Footer                           ├─ POST /login         │
       ├─ ThemeProvider ◄────────────────►├─ POST /logout        │
       │   (Light/Dark)                     ├─ POST /refresh-token│
       │                                    └──────────────────────┘
       └─ Toaster (sonner)
```

---

## Component Hierarchy

```
App Root
├── Layout.tsx (RootLayout)
│   ├── HTML Theme Script (inline)
│   ├── Fonts (Cormorant, DM Sans, Bebas)
│   ├── Metadata (SEO)
│   ├── Providers
│   │   ├── ThemeProvider (Context)
│   │   └── Toaster (sonner)
│   │
│   └── Routes
│       ├── Page (Home)
│       │   └── Navbar (transparent)
│       │   └── LandingPage
│       │       ├── HeroSection
│       │       │   ├── ParticleCanvas (Framer Motion)
│       │       │   └── Marquee
│       │       ├── AboutSection
│       │       │   ├── AboutHero
│       │       │   ├── MilestoneTimeline
│       │       │   ├── AboutPillars
│       │       │   └── AboutStats
│       │       ├── CategoriesSection
│       │       │   ├── CategoryGrid (bento layout)
│       │       │   ├── CategoryCard (6 categories)
│       │       │   └── CategoryStrip
│       │       ├── SpeakersSection
│       │       │   ├── SpeakerRoster (6 speakers)
│       │       │   ├── SpotlightPanel
│       │       │   └── ExpertiseMarquee
│       │       ├── HowItWorksSection (4 steps)
│       │       │   ├── StepNode
│       │       │   └── DetailPanel
│       │       ├── WebinarShowcase
│       │       │   └── WebinarCard[]
│       │       └── CTASection
│       │           ├── RegistrationForm
│       │           └── SocialProofStrip
│       │   └── Footer
│       │
│       ├── /webinars Page
│       │   ├── Navbar (solid)
│       │   ├── WebinarDiscovery
│       │   │   ├── CategoryFilter (pills)
│       │   │   ├── SearchBar
│       │   │   ├── ViewModeToggle
│       │   │   ├── WebinarCard[] (grid/list)
│       │   │   └── Pagination
│       │   └── Footer
│       │
│       ├── /webinars/[id] Page
│       │   └── WebinarProfilePage
│       │
│       ├── /speakers/[id] Page
│       │   └── SpeakerProfilePage
│       │
│       └── /admin (NEW)
│           └── AdminLayout
│               ├── AdminSidebar (navigation)
│               ├── AdminHeader (user, logout)
│               └── Pages
│                   ├── /admin (Dashboard)
│                   ├── /admin/webinars (CRUD)
│                   ├── /admin/speakers (CRUD)
│                   ├── /admin/registrations (List + Export)
│                   ├── /admin/analytics (Charts)
│                   ├── /admin/users (Management)
│                   └── /admin/settings (Config)
```

---

## Data Flow Diagram

### Current Flow (Client-Side Only)

```
Landing Page
    │
    ├─► data.ts (static imports)
    │   ├─ WEBINARS array
    │   ├─ SPEAKERS array
    │   ├─ CATEGORIES array
    │   ├─ STATS array
    │   └─ EXPERTISE_TAGS array
    │
    └─► Components render from static data
        ├─ CategorySection ◄─ categorySection/data.ts
        ├─ SpeakersSection ◄─ speakerSection/data.ts
        ├─ WebinarShowcase ◄─ webinerDiscovery/data.ts
        └─ CTASection ◄─ CTA/constants.tsx
```

### New Admin Flow (Database + API + Auth)

```
┌──────────────────────────────────────────────────────────────────┐
│                  Admin Dashboard Request                         │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Auth Middleware │
                     └────────┬────────┘
                              │
                    ✓ Check JWT token
                    ✓ Verify permissions
                    ✗ Redirect to /admin/auth/login
                              │
                              ▼
                 ┌──────────────────────────┐
                 │  React Component         │
                 │  (Admin Page)            │
                 └────────┬─────────────────┘
                          │
            ┌─────────────┼─────────────┐
            │             │             │
            ▼             ▼             ▼
    ┌────────────┐ ┌──────────┐ ┌──────────┐
    │ API Route  │ │ Database │ │ Cache    │
    │ /api/web.. │ │(Prisma)  │ │ (Redis?) │
    └────────┬───┘ └────┬─────┘ └──┬───────┘
             │          │          │
             └──────────┼──────────┘
                        │
                  JSON Response
                        │
                        ▼
            ┌──────────────────────┐
            │  React State Update  │
            │  (useState/Zustand)  │
            └────────┬─────────────┘
                     │
                     ▼
            ┌─────────────────────┐
            │ UI Renders/Updates  │
            │ (Tables, Charts)    │
            └─────────────────────┘
```

---

## Database Integration Point

```
Current State:
data.ts (Static) ━━━━━━━━━━━━ Components
                    │
                    └─ No backend
                    └─ All data hardcoded

After Admin Implementation:

Public Routes (Read-Only - Can Stay Static)
    │
    ├─ /page.tsx ◄─ data.ts (keep as static or migrate to DB)
    └─ /webinars, /speakers/[id] ◄─ generateStaticParams() from DB
         (SSG: pre-built at build time or on-demand)

Admin Routes (Dynamic - Full CRUD)
    │
    ├─ /admin/... ◄─ API Routes ◄─ Database (Prisma ORM)
    └─ Real-time operations via /api/...
```

---

## File Structure: Before vs After

### BEFORE (Current)

```
src/
├── app/
│   ├── page.tsx              ✓ Home
│   ├── layout.tsx            ✓ Root Layout
│   └── webinars/
│       ├── page.tsx          ✓ Webinar List
│       └── [id]/
│           └── page.tsx      ✓ Webinar Detail
│
├── components/
│   ├── sections/             ✓ 7 landing page sections
│   ├── layout/               ✓ Navbar, Footer
│   ├── ui/                   ✓ Button, Input, etc.
│   ├── page/                 ✓ LandingPage, WebinerShowcase
│   ├── providers/            ✓ ThemeProvider
│   ├── data/                 ✓ data.ts
│   └── types/                ✓ types.ts
│
└── lib/
    └── utils.ts              ✓ Shared utilities
```

### AFTER (With Admin)

```
src/
├── app/
│   ├── page.tsx              ✓ Home (unchanged)
│   ├── layout.tsx            ✓ Root Layout (unchanged)
│   ├── webinars/             ✓ Public routes (unchanged)
│   │
│   ├── admin/                🆕 NEW SECTION
│   │   ├── layout.tsx        🆕 Admin Layout
│   │   ├── page.tsx          🆕 Dashboard
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── logout/page.tsx
│   │   │   └── ...
│   │   ├── webinars/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── speakers/
│   │   ├── registrations/
│   │   ├── analytics/
│   │   ├── users/
│   │   └── settings/
│   │
│   └── api/                  🆕 NEW SECTION
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── ...
│       ├── webinars/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── speakers/
│       ├── registrations/
│       ├── analytics/
│       └── ...
│
├── components/
│   ├── sections/             ✓ Landing sections (unchanged)
│   ├── layout/               ✓ Public layout (unchanged)
│   ├── ui/                   ✓ Shared UI (unchanged)
│   ├── admin/                🆕 NEW - Admin-specific components
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── tables/
│   │   ├── charts/
│   │   ├── modals/
│   │   ├── dashboard/
│   │   └── email/
│   └── ...
│
├── lib/
│   ├── utils.ts              ✓ Existing utilities
│   ├── admin/                🆕 NEW - Admin utilities
│   │   ├── auth.ts
│   │   ├── permissions.ts
│   │   ├── validators.ts
│   │   ├── export.ts
│   │   └── api-client.ts
│   ├── hooks/                🆕 NEW - Custom hooks
│   │   ├── useAdmin.ts
│   │   ├── useAuth.ts
│   │   └── ...
│   └── ...
│
├── types/
│   ├── types.ts              ✓ Public types
│   ├── admin.ts              🆕 NEW - Admin types
│   └── ...
│
├── db/                       🆕 NEW - Database layer
│   ├── schema.ts
│   ├── migrations/
│   └── seeds/
│
└── ...
```

---

## Authentication Flow

```
┌───────────────────────────────────────────────────────────────┐
│           Admin Login / Session Management                    │
└───────────────────────────────────────────────────────────────┘

1. Login Page
   ┌─────────────────────────┐
   │ Email input             │
   │ Password input          │
   └──────────┬──────────────┘
              │
              ▼
   POST /api/auth/login
   { email, password }
              │
              ├─ Validate email/password
              ├─ Check User in Database
              ├─ Compare password hash (bcryptjs)
              │
              (✓ Match) ──────────┐
              (✗ No match)──────┐ │
                                │ │
                                ▼ ▼
                        Generate JWT
                        (exp: 30-60 min)
                        + Refresh Token
                        (exp: 7 days)
                                │
                                ▼
                        Set httpOnly cookie
                        + localStorage (optional)
                        │
                        ▼
                   Redirect to /admin
                        │
2. Protected Admin Routes
   Every request includes JWT
   (via httpOnly cookie or Auth header)
              │
              ▼
   Middleware verifies JWT
   ├─ Check signature
   ├─ Check expiration
   ├─ Extract user claims
              │
    (✓ Valid) ├─ Allow request ───┐
              │                    │
    (✗ Invalid) ─ Refresh? ─── Check Refresh Token
                     │
                (✓ Valid) ─ New JWT
                (✗ Expired) ─ Logout → /admin/auth/login
                     │
                     ▼
              Middleware Complete
              │
              ▼
         API Route/Component
         Checks Permissions
              │
         (✓ Allowed) ─ Proceed
         (✗ Denied) ─ 403 Forbidden
```

---

## Data Flow: Webinar CRUD Example

```
┌──────────────────────────────────────────────────────────────────┐
│  Admin creates new webinar: /admin/webinars/new                  │
└──────────────────────────────────────────────────────────────────┘

User Input (WebinarForm.tsx)
    ├─ Title
    ├─ Description
    ├─ Category
    ├─ Date & Time
    ├─ Speakers (multi-select)
    ├─ Banner Upload
    └─ Learning Objectives
         │
         ▼
    Form Validation (Zod schema)
    ├─ Title: min 10 chars
    ├─ Date: must be future
    └─ Speakers: min 1 selected
         │
    (✓ Valid) ──────┐
    (✗ Invalid)─────┤
                    │ Show error messages
                    │
                    ▼
            POST /api/webinars
            { title, description, ... }
                    │
                    ▼
        ┌──────────────────────────┐
        │  API Route Handler       │
        │  /api/webinars/route.ts  │
        └────────┬─────────────────┘
                 │
        ├─ Auth check (verify JWT)
        ├─ Permission check (user.role === 'admin')
        ├─ Input validation
        ├─ Image upload to /public/uploads/
        │
        ▼
        ┌──────────────────────────┐
        │  Prisma ORM              │
        │  Create Webinar          │
        └────────┬─────────────────┘
                 │
        ├─ INSERT into webinars table
        ├─ INSERT into webinar_speakers junction
        ├─ TRIGGER: Update statistics
        │
        ▼
        ┌──────────────────────────┐
        │  Database (PostgreSQL)   │
        │  Write to Disk           │
        └────────┬─────────────────┘
                 │
        ▼ Success / Error
        │
        ▼
    Return Response
    {
      success: true,
      webinar: { id, title, ... },
      message: "Webinar created successfully"
    }
         │
         ▼
    Update Component State
    ├─ setWebinars([...webinars, newWebinar])
    ├─ Show success toast
    └─ Redirect to /admin/webinars
         │
         ▼
    WebinarsTable Re-renders
    ├─ Shows new webinar in list
    └─ Can now Edit/Delete/Publish
```

---

## Public vs Admin Data Access

```
PUBLIC ROUTES                          ADMIN ROUTES
─────────────────────────────────────────────────────────

Landing Page                          Admin Dashboard
├─ Static: data.ts                   ├─ Dynamic: /api/analytics/dashboard
├─ Pre-rendered                       ├─ Real-time data
├─ No auth required                   ├─ Auth required
└─ Fast (CDN cached)                  └─ Fresh data

Webinar Discovery                     Webinar Management
├─ Static categories                  ├─ Full CRUD
├─ Filter client-side (9 webinars)   ├─ API filters (any number)
├─ No auth                            ├─ Auth required
└─ Read-only                          └─ Create/Edit/Delete

Webinar Detail Page                   Webinar Detail (Admin)
├─ SSG: `generateStaticParams()`      ├─ Full edit form
├─ Pre-rendered at build              ├─ Dynamic: fetch from /api/webinars/[id]
├─ Read-only                          ├─ Real-time updates
└─ No auth                            └─ Auth required

Registration Form (CTA)               Registration List
├─ Submit: POST (but no backend)      ├─ /api/registrations
├─ Client-side validation             ├─ Paginated/filtered
├─ No auth                            ├─ Auth required
└─ Currently just shows "success"     └─ Can export CSV/XLSX
```

---

## How Existing Components Adapt

### WITH NO CHANGES REQUIRED:
```
✓ UI Components (Button, Input, etc.)
✓ Theme system (Light/Dark)
✓ Font system
✓ Layouts (Navbar, Footer can be reused)
✓ Animation utilities
✓ Type definitions (shared with admin)
✓ CSS variables + Tailwind
✓ Global CSS
```

### NEW ADMIN-SPECIFIC VERSIONS:
```
🆕 AdminSidebar (different from Navbar)
🆕 AdminHeader (user profile, logout)
🆕 DataTable (paginated, sortable, filterable)
🆕 Forms (WebinarForm, SpeakerForm with validation)
🆕 Charts (Recharts integration)
🆕 Export utilities (CSV/XLSX)
```

### POTENTIALLY SHARED (After Migration):
```
? Webinar data source (currently data.ts → could come from DB)
? Speaker data source (currently data.ts → could come from DB)
? Category data (currently hardcoded → could come from DB)
```

---

## Environment Variables Needed

```env
# .env.local for development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/iegs_webinar

# JWT Secret
JWT_SECRET=very-secure-random-string-min-32-chars
JWT_REFRESH_SECRET=another-secure-random-string

# Auth settings
AUTH_TOKEN_EXPIRY=3600                    # 1 hour in seconds
AUTH_REFRESH_EXPIRY=604800                # 7 days in seconds

# Upload settings
UPLOAD_MAX_SIZE=5242880                   # 5MB
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/webp

# Email settings (if integrating)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# Cloud storage (if using)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Key Takeaways

1. **Minimal Impact on Public Routes** - The existing landing page and webinar discovery can remain unchanged
2. **Clean Separation** - Admin section is completely isolated under `/admin` and `/api`
3. **Reuse Existing Design System** - Use same colors, fonts, animations, UI components
4. **Scalable Architecture** - Database layer can gradually replace static data.ts files
5. **Security First** - JWT-based auth, role-based access, encrypted passwords
6. **Future-Ready** - Structure supports webhooks, integrations, and extensibility

---

**Diagrams Created**: March 12, 2026
