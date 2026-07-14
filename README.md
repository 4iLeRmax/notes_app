# Notes App

A full-stack, encrypted notes application built with Next.js App Router. Supports text notes and to-do style checklist notes, drag-and-drop reordering, labels, pinning, and a custom neumorphic design system with rich Framer Motion animations.

**Live demo:** [notes-app-teal-xi.vercel.app](https://notes-app-teal-xi.vercel.app)

## Features

- 🔐 **Authentication** — email/password auth via `better-auth`, with sign up, sign in, email verification, password reset, and account lookup flows
- 📝 **Two note types** — freeform text notes and checklist (`TODO`) notes with individually toggleable, reorderable items
- 🔒 **Per-user encryption** — note content is encrypted at rest (AES-256-GCM) with a per-user encryption key
- 🏷️ **Labels** — create, edit, delete, and filter notes by custom labels
- 📌 **Pinning & sorting** — pin important notes and sort your list the way you want
- ↕️ **Drag-and-drop reordering** — smooth, physics-based reordering of checklist items and notes via Framer Motion's `Reorder`
- ⚡ **Optimistic updates** — instant UI feedback for creating, editing, and deleting notes/items, with automatic rollback on failure
- 🎨 **Custom design system** — neumorphic UI built on Tailwind CSS with light/dark theme support
- 📧 **Transactional email** — account verification and password reset emails via Resend
- 📱 **Responsive** — dedicated desktop/mobile component variants with SSR-safe hydration

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Actions) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| Animation | Framer Motion (`motion`) |
| Client state | Zustand |
| Server state / caching | TanStack Query |
| Forms & validation | React Hook Form, Zod |
| Database | PostgreSQL via Prisma ORM |
| Auth | better-auth |
| Email | Resend |
| Icons | lucide-react |

## Data Model

Defined in `prisma/schema.prisma`:

- **User** — account record (integrates with better-auth's `Session`/`Account`/`Verification` tables)
- **Note** — has a `type` (`TEXT` or `TODO`), optional `color`, `isPinned` flag, and belongs to a `User`
- **NoteItem** — individual line/checklist item belonging to a `Note`, with `content`, `isDone`, and a `position` for ordering
- **Label** — user-scoped, many-to-many with `Note`

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # sign-in, sign-up, reset-password, find-account, send-email
│   ├── (main)/          # notes list, label views
│   └── api/             # better-auth handler, send-mail route
├── components/
│   ├── UI/              # dialogs, form elements, skeletons, status bar, "more" menu
│   └── aside/           # sidebar, label management
└── lib/
    ├── actions/         # server actions (note, note-item, label, auth) + typed error classes
    ├── encryption/      # AES-256-GCM encrypt/decrypt helpers
    ├── store/           # Zustand stores (notes, sort, view mode, selection)
    ├── zod-schemes/     # Zod validation schemas for forms & server actions
    └── auth.ts          # better-auth configuration
```
