# 🎯 ADMIN SECTION ARCHITECTURE GUIDE

## Overview
This document outlines the structure for implementing an admin dashboard for the IEGS Geospatial Webinar Platform. The admin section will manage webinars, speakers, registrations, and analytics.

---

## 📁 Proposed Folder Structure

```
src/
├── app/
│   ├── admin/                          # New admin section
│   │   ├── layout.tsx                  # Admin layout (sidebar + header)
│   │   ├── page.tsx                    # Dashboard overview
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── logout/page.tsx
│   │   │   └── (auth layouts)
│   │   ├── webinars/
│   │   │   ├── page.tsx                # Webinar list + filters
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx            # Edit webinar
│   │   │   └── new/page.tsx            # Create webinar
│   │   ├── speakers/
│   │   │   ├── page.tsx                # Speaker list
│   │   │   ├── [id]/page.tsx           # Edit speaker
│   │   │   └── new/page.tsx            # Create speaker
│   │   ├── registrations/
│   │   │   ├── page.tsx                # Registration list + export
│   │   │   └── [id]/page.tsx           # Registration detail
│   │   ├── analytics/
│   │   │   ├── page.tsx                # Analytics dashboard
│   │   │   ├── webinars/
│   │   │   │   └── page.tsx
│   │   │   └── speakers/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx                # Admin settings
│   │   └── users/
│   │       ├── page.tsx                # User management
│   │       └── [id]/page.tsx
│   │
│   ├── api/                            # New API routes
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── verify/route.ts
│   │   ├── webinars/
│   │   │   ├── route.ts                # GET all, POST create
│   │   │   └── [id]/route.ts           # GET, PATCH, DELETE
│   │   ├── speakers/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── registrations/
│   │   │   ├── route.ts
│   │   │   ├── [id]/route.ts
│   │   │   └── export/route.ts         # CSV/XLSX export
│   │   └── analytics/
│   │       ├── dashboard/route.ts
│   │       ├── webinars/route.ts
│   │       └── speakers/route.ts
│   │
├── components/
│   ├── admin/                          # Admin-specific components
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminNavigation.tsx
│   │   ├── forms/
│   │   │   ├── WebinarForm.tsx         # Create/Edit webinar
│   │   │   ├── SpeakerForm.tsx         # Create/Edit speaker
│   │   │   ├── UserForm.tsx
│   │   │   └── SettingsForm.tsx
│   │   ├── tables/
│   │   │   ├── WebinarsTable.tsx
│   │   │   ├── SpeakersTable.tsx
│   │   │   ├── RegistrationsTable.tsx
│   │   │   └── UsersTable.tsx
│   │   ├── modals/
│   │   │   ├── DeleteConfirmModal.tsx
│   │   │   ├── UploadImageModal.tsx
│   │   │   └── BulkActionModal.tsx
│   │   ├── charts/
│   │   │   ├── RegistrationTrend.tsx   # Line chart
│   │   │   ├── CategoryBreakdown.tsx   # Pie chart
│   │   │   ├── SpeakerPerformance.tsx
│   │   │   └── GeographicMap.tsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── MetricsGrid.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   └── QuickActions.tsx
│   │   └── email/
│   │       ├── EmailTemplateEditor.tsx
│   │       ├── PreviewPanel.tsx
│   │       └── TemplateLibrary.tsx
│   │
├── lib/
│   ├── admin/                          # Admin utilities
│   │   ├── auth.ts                     # Auth helpers (JWT, session)
│   │   ├── permissions.ts              # RBAC utilities
│   │   ├── validators.ts               # Zod schemas for admin forms
│   │   ├── export.ts                   # CSV/XLSX generation
│   │   ├── email.ts                    # Email sending utilities
│   │   └── api-client.ts               # Typed API calls
│   │
│   └── hooks/
│       ├── useAdmin.ts                 # Admin context hook
│       ├── useAuth.ts                  # Auth hook
│       ├── usePagination.ts
│       ├── useFilters.ts
│       └── useExport.ts
│
├── db/                                 # Database (if using)
│   ├── schema.ts                       # Prisma/Drizzle schema
│   ├── migrations/
│   └── seeds/
│
└── types/
    ├── admin.ts                        # Admin types
    ├── auth.ts
    └── api.ts
```

---

## 📊 Database Schema

### Core Tables

```typescript
// ============================================================
// USERS & AUTHENTICATION
// ============================================================

User {
  id: UUID
  email: string @unique
  password_hash: string
  name: string
  role: 'admin' | 'moderator' | 'speaker'
  permissions: string[]
  avatar_url?: string
  is_active: boolean
  created_at: timestamp
  updated_at: timestamp
  last_login: timestamp?
}

// ============================================================
// WEBINARS (Enhanced)
// ============================================================

Webinar {
  id: UUID
  title: string
  description: string
  category: enum (gis, drones, agriculture, oil-gas, remote, land-admin)
  status: enum (draft, scheduled, live, completed, cancelled)
  
  // Scheduling
  date: datetime
  time: string (HH:MM)
  timezone: string (default: 'GMT')
  duration_minutes: number
  
  // Media
  banner_url: string?
  banner_source: enum (upload, unsplash, generative)
  
  // Speakers
  speaker_ids: UUID[] (foreign key)
  
  // Content
  learning_objectives: string[]
  agenda: {
    time: string
    topic: string
    speaker_id?: UUID
  }[]
  
  // Registration & Attendance
  registrations: number (count)
  max_registrations: number?
  published: boolean
  
  // Metadata
  zoom_meeting_id?: string
  zoom_join_url?: string
  
  created_by: UUID (foreign key to User)
  created_at: timestamp
  updated_at: timestamp
}

// ============================================================
// SPEAKERS (Enhanced)
// ============================================================

Speaker {
  id: UUID
  first_name: string
  last_name: string
  title: string
  organization: string
  bio: string
  
  // Media
  image_url: string?
  image_upload_date: timestamp?
  
  // Contact & Social
  email: string
  phone: string?
  linkedin_url: string?
  
  // Platform
  expertise: string[] (tags)
  accent_color: string (hex color for spotlight)
  role: enum (host, guest, moderator)
  webinar_ids: UUID[]
  
  is_featured: boolean
  featured_order: number?
  
  created_at: timestamp
  updated_at: timestamp
}

// ============================================================
// REGISTRATIONS
// ============================================================

Registration {
  id: UUID
  webinar_id: UUID (foreign key)
  
  // Personal Info
  first_name: string
  last_name: string
  email: string @unique(webinar_id, email)
  phone: string?
  timezone: string
  
  // Preferences
  interests: string[]
  newsletter_opt_in: boolean
  
  // Attendance
  status: enum (registered, attended, no-show, cancelled)
  attended_at: timestamp?
  satisfaction_score: 1-5?
  feedback: text?
  
  // Communication
  confirmation_email_sent: boolean
  reminder_24h_sent: boolean
  reminder_1h_sent: boolean
  post_webinar_email_sent: boolean
  
  created_at: timestamp
  updated_at: timestamp
}

// ============================================================
// EMAIL TEMPLATES
// ============================================================

EmailTemplate {
  id: UUID
  name: string @unique
  type: enum (confirmation, reminder_24h, reminder_1h, feedback, newsletter)
  subject: string
  html_body: string
  plain_text_body: string
  variables: string[] (JSON array of variable names)
  is_default: boolean
  is_active: boolean
  created_at: timestamp
  updated_at: timestamp
}

// ============================================================
// ANALYTICS
// ============================================================

WebinarAnalytic {
  id: UUID
  webinar_id: UUID (foreign key) @unique
  
  // Metrics
  total_registrations: number
  total_attendees: number
  no_show_count: number
  avg_attendance_duration_minutes: number
  
  // Engagement
  avg_satisfaction_score: float (1-5)
  feedback_submissions: number
  sharing_count: number
  
  // Traffic
  page_views: number
  unique_visitors: number
  
  created_at: timestamp
  updated_at: timestamp
}

SpeakerAnalytic {
  id: UUID
  speaker_id: UUID (foreign key) @unique
  
  // Stats
  total_webinars_hosted: number
  total_attendees: number
  avg_satisfaction_score: float
  highest_rated_webinar_id: UUID?
  
  created_at: timestamp
  updated_at: timestamp
}

// ============================================================
// AUDIT LOG (Optional but recommended)
// ============================================================

AuditLog {
  id: UUID
  user_id: UUID (foreign key)
  action: string (created, updated, deleted, published, etc.)
  entity_type: string (Webinar, Speaker, User, etc.)
  entity_id: UUID
  old_values: JSON?
  new_values: JSON?
  ip_address: string?
  user_agent: string?
  created_at: timestamp
}
```

---

## 🔐 Authentication & Authorization

### Session Flow

```typescript
// 1. Login
POST /api/auth/login
{
  email: string
  password: string
}
// Response: { token, user, permissions }

// 2. Verify Token
GET /api/auth/verify
// Header: Authorization: Bearer <token>

// 3. Logout
POST /api/auth/logout

// 4. Refresh Token
POST /api/auth/refresh-token
```

### Role-Based Access Control (RBAC)

```typescript
// Roles & Permissions

ROLES = {
  'admin': [
    'webinar.create',
    'webinar.edit',
    'webinar.delete',
    'speaker.create',
    'speaker.delete',
    'user.create',
    'user.edit',
    'user.delete',
    'settings.edit',
    'analytics.view',
    'registrations.export',
    'email.send',
  ],
  'moderator': [
    'webinar.view',
    'webinar.edit',
    'speaker.view',
    'registrations.view',
    'registrations.export',
    'analytics.view',
    'email.send',
  ],
  'speaker': [
    'webinar.view',
    'speaker.view',
    'speaker.edit', // only own profile
    'registrations.view', // only own webinars
  ],
}
```

---

## 🎨 Admin UI Components

### Key Components to Build

#### 1. **Dashboard Overview**
```typescript
// Components/admin/dashboard/
- StatCard (value, label, trend, icon)
- MetricsGrid (arrange stat cards in grid)
- RegistrationTrendChart (line chart, last 30 days)
- ActivityFeed (recent actions)
- QuickActionButtons (create webinar, export, etc.)
- UpcomingWebinarsWidget
- TopSpeakersWidget
```

#### 2. **Data Tables**
```typescript
// Components/admin/tables/
interface TableProps {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading: boolean
  pagination: { page, pageSize, total }
  onPageChange: (page: number) => void
  onSort: (column: string) => void
  onFilter: (filters: Record<string, any>) => void
  selectable: boolean
  onSelectionChange: (selectedIds: UUID[]) => void
  actions: { icon, label, onClick }[]
}

// Use shadcn's DataTable component (already in project)
- WebinarsTable (columns: title, category, status, date, registrations, actions)
- SpeakersTable (columns: name, title, expertise, webinars, actions)
- RegistrationsTable (columns: name, email, webinar, status, attended, actions)
- UsersTable (columns: email, name, role, last_login, actions)
```

#### 3. **Forms**
```typescript
// Components/admin/forms/
interface FormProps {
  initialData?: T
  onSuccess: (data: T) => void
  isLoading: boolean
}

// Forms using react-hook-form + zod + shadcn Input/Button
- WebinarForm (title, description, category, date, time, speakers, etc.)
- SpeakerForm (name, title, org, bio, image upload, expertise tags, etc.)
- UserForm (email, name, role, permissions)
- SettingsForm (branding, email config, timezone)
- EmailTemplateForm (subject, HTML editor with variables)
```

#### 4. **Image Upload**
```typescript
// Enhanced for admin
- Drag & drop zone
- Image preview
- Crop tool (using react-easy-crop or similar)
- Progress bar
- Size/dimension validation
- Upload to: /public/uploads/admin/ or cloud storage (AWS S3, Cloudinary)

// Add to dependencies:
npm install react-easy-crop next-cloudinary
```

---

## 🔌 API Endpoints Structure

```
# WEBINARS
GET    /api/webinars                      # List all (filters, pagination)
POST   /api/webinars                      # Create
GET    /api/webinars/[id]                 # Get single
PATCH  /api/webinars/[id]                 # Update
DELETE /api/webinars/[id]                 # Delete
PATCH  /api/webinars/[id]/publish         # Publish/unpublish
PATCH  /api/webinars/[id]/status          # Update status

# SPEAKERS
GET    /api/speakers                      # List all
POST   /api/speakers                      # Create
GET    /api/speakers/[id]                 # Get single
PATCH  /api/speakers/[id]                 # Update
DELETE /api/speakers/[id]                 # Delete
POST   /api/speakers/[id]/upload-image    # Upload speaker image

# REGISTRATIONS
GET    /api/registrations                 # List (filters: webinar, status, date range)
GET    /api/registrations/[id]            # Get single
PATCH  /api/registrations/[id]            # Update (status, satisfaction)
PATCH  /api/registrations/[id]/attendance # Mark attendance
DELETE /api/registrations/[id]            # Delete
POST   /api/registrations/export          # Export CSV/XLSX

# ANALYTICS
GET    /api/analytics/dashboard           # Overview stats
GET    /api/analytics/webinars            # Webinar metrics
GET    /api/analytics/speakers            # Speaker metrics
GET    /api/analytics/registrations       # Registration trends
GET    /api/analytics/geographic          # Countries breakdown

# EMAIL TEMPLATES
GET    /api/email-templates               # List
POST   /api/email-templates               # Create
GET    /api/email-templates/[id]          # Get single
PATCH  /api/email-templates/[id]          # Update
DELETE /api/email-templates/[id]          # Delete
POST   /api/email-templates/[id]/send-test # Send test email

# AUTHENTICATION
POST   /api/auth/login                    # Login (email, password)
POST   /api/auth/logout                   # Logout
POST   /api/auth/refresh-token            # Refresh JWT
GET    /api/auth/verify                   # Verify current session

# USERS
GET    /api/users                         # List users (admin only)
POST   /api/users                         # Create user
PATCH  /api/users/[id]                    # Update user
DELETE /api/users/[id]                    # Delete user (admin only)
POST   /api/users/[id]/reset-password     # Reset password
```

---

## 🛠️ Implementation Priority

### Phase 1: MVP (Essential)
- [ ] Authentication (JWT-based login)
- [ ] Admin layout (sidebar + header)
- [ ] Dashboard with basic metrics
- [ ] Webinar CRUD (list, create, edit, delete)
- [ ] Speaker CRUD
- [ ] Registration list + export (CSV)
- [ ] Basic analytics (top metrics)

### Phase 2: Enhanced Features
- [ ] User role management
- [ ] Email template editor
- [ ] Advanced analytics (charts, geographic)
- [ ] Attendance tracking
- [ ] Bulk actions (publish, delete)
- [ ] Search & filtering UI

### Phase 3: Integrations & Polish
- [ ] Zoom API integration
- [ ] Email service integration (Mailchimp, SendGrid)
- [ ] Image upload/cropping
- [ ] Audit logging
- [ ] Two-factor authentication
- [ ] API documentation (Swagger/OpenAPI)

### Phase 4: Advanced
- [ ] CMS for landing page content
- [ ] Advanced reporting
- [ ] Webhook integrations
- [ ] Admin dashboard customization

---

## 📦 Additional Dependencies to Add

```json
{
  "next-auth": "^5.0.0",           // Authentication (alternative to manual JWT)
  "jsonwebtoken": "^9.1.0",         // JWT token generation
  "bcryptjs": "^2.4.3",             // Password hashing
  "react-hot-toast": "^2.4.1",      // Better than sonner for admin UX
  "@tanstack/react-table": "^8.0.0", // Advanced table component
  "recharts": "^2.10.0",            // Charts (line, pie, bar)
  "axios": "^1.6.0",                // HTTP client
  "date-fns": "^2.30.0",            // Already installed
  "zod": "^3.22.0",                 // Already installed
  "react-easy-crop": "^10.0.0",     // Image cropping
  "react-dropzone": "^14.2.0",      // File upload
  "csv-parser": "^3.0.0",           // CSV parsing
  "papaparse": "^5.4.1",            // CSV generation
  "@hookform/resolvers": "^3.3.4",  // Already installed
  "lucide-react": "^0.575.0",       // Already installed
  "framer-motion": "^12.3.4"        // Already installed
}
```

---

## 🔒 Security Considerations

1. **Authentication**
   - Store JWT in httpOnly cookies (not localStorage)
   - Implement refresh token rotation
   - 30-60 min token expiry

2. **Authorization**
   - Middleware to check user role/permissions
   - API routes validate permissions
   - Client-side UI hides restricted features

3. **Data Protection**
   - Hash passwords with bcryptjs
   - Sanitize user inputs
   - CORS policy restricted to admin domain
   - Rate limiting on auth endpoints

4. **Audit & Logging**
   - Log all admin actions
   - Track data changes
   - Monitor failed login attempts

---

## 📝 Notes

- **Keep data.ts files**: Current static data structure can be migrated to database gradually
- **Backward compatibility**: Public routes (webinars, speakers) remain unchanged
- **Reuse UI components**: Admin forms use existing Button, Input components from `src/components/ui/`
- **Theme awareness**: Admin section respects light/dark theme toggle
- **Mobile consideration**: Admin dashboard is desktop-focused (tablets/phones show warning)

---

## 🚀 Getting Started Checklist

- [ ] Set up database (Prisma + PostgreSQL recommended)
- [ ] Create API routes structure
- [ ] Implement authentication middleware
- [ ] Build admin layout component
- [ ] Create dashboard overview page
- [ ] Build webinar management pages
- [ ] Add speaker management
- [ ] Implement registration export
- [ ] Add analytics dashboards
- [ ] Test all CRUD operations
- [ ] Deploy to staging
- [ ] Security audit
- [ ] User acceptance testing

---

**Last Updated**: March 12, 2026
