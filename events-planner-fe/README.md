# Event Planner

React frontend for an event planning calendar. The app lets authenticated users browse events in calendar views, manage event CRUD flows, and use a sidebar with a mini calendar and upcoming events.

## Features

- Authentication flow with login, register, logout, session restore, and protected routes.
- Centralized API client with authenticated requests, refresh-token retry, and public auth requests.
- Calendar dashboard with sidebar, top navigation, and view switcher.
- Day and week calendar views with time-grid event rendering.
- Event create, edit, delete, and details flows.
- Mini calendar synchronized with the main calendar date.
- Upcoming events section in the sidebar.
- Form validation with React Hook Form and Zod.
- Server state management with TanStack Query.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Sonner

## Prerequisites

- Node.js
- pnpm
- A running backend API that exposes the expected auth, users, and events endpoints.

## Environment

Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set the API base URL:

```env
VITE_API_BASE_URL="http://localhost:5000/"
```

The value should include the trailing slash. API calls are built as:

```text
{VITE_API_BASE_URL}api/...
```

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The app will start through Vite and print the local URL in the terminal.

## Build

```bash
pnpm build
```

This runs TypeScript project build checks and creates the production bundle.

## Useful Scripts

```bash
pnpm dev
```

Starts the development server.

```bash
pnpm build
```

Builds the app for production.

```bash
pnpm lint
```

Runs ESLint.

```bash
pnpm madge
```

Checks for circular dependencies starting from `src/main.tsx`.

```bash
pnpm prettier
```

Formats supported source files.

## Project Structure

```text
src/
  api/          API client and endpoint services
  app/          App shell and router
  auth/         Auth context, provider, route guards, and role utilities
  components/   Shared UI, calendar, sidebar, navbar, events, and modals
  config/       App constants and layout/style config
  hooks/        Query and mutation hooks
  pages/        Route-level pages
  query/        TanStack Query setup and query keys
  schemas/      Zod validation schemas
  store/        Zustand stores
  types/        Shared TypeScript types
  utils/        Date, event, route, and string helpers
```

## Authentication Notes

- Login and register use public API requests.
- Authenticated API requests attach the access token from `sessionStorage`.
- On `401`, the API client attempts to refresh the access token once.
- If refresh fails, the token is cleared and the app is notified that the session expired.
- Protected routes wait for auth restoration before rendering private content.

## API Endpoints Used

```text
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/users/me
GET    /api/users/:id
GET    /api/events
GET    /api/events/range
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

## Submission Checklist

- Configure `.env` with the backend API URL.
- Run `pnpm lint`.
- Run `pnpm madge`.
- Run `pnpm build`.
- Verify login, register, logout, session restore, and protected route behavior.
- Verify event create, edit, delete, and sidebar/calendar synchronization.
