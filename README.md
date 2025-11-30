# 811 – Emergency Assistance MVP

811 is a React + Vite application for managing emergency assistance requests.

The MVP focuses on three roles:

- **User** – submits a structured help request through a multi-step wizard
- **Organization** – views volunteers and manages logistics (WIP)
- **Admin** – basic control panel and dashboards (WIP)

---

## Tech stack

- **React + TypeScript**
- **Vite** for bundling and dev server
- **React Router** for routing
- **Sass (SCSS)** for styling, with layout helpers (flex / grid utilities)
- **i18next + react-i18next** for localization (Hebrew ↔ English)
- **LocalStorage** for persisting the latest user request

---

## Features

### 🧑‍💻 User area

- **User dashboard**

  - Quick stats and actions
  - Buttons for:
    - Creating a new request
    - Viewing the last saved request

- **Multi-step request wizard** (`/user/request`)

  1. **Who needs help?**  
     Recipient name, phone, request title.
  2. **Where should we arrive?**  
     District + city combo select (city list depends on district), optional street.
  3. **What kind of assistance is needed?**  
     Categories such as food, transportation, volunteers, shelters, etc.  
     Each category has multiple sub-options that can be multi-selected.
  4. **Extra details**  
     Toggles for transport / volunteers and file upload section.
  5. **Important details**  
     Free text description and refined title.
  6. **Summary & confirmation**  
     Accordion summary, localized date/time, and final submission.

- **My request page** (`/user/my-request`)
  - Reads the last submitted request from `localStorage`
  - Shows a read-only summary (same structure as the confirmation step)
  - Allows clearing the saved request

### 🌐 Localization

- Two languages:
  - `he` – Hebrew (RTL)
  - `en` – English (LTR)
- Language is:
  - Detected on first load (browser or saved setting)
  - Persisted to `localStorage`
  - Controls `<html dir>` and `<html lang>`
- Each page includes a language switcher that keeps layout consistent.

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

The app runs on Vite’s default dev port (usually `http://localhost:5173`).

---

## Project structure (simplified)

```txt
src/
  App.tsx                 # App routes, grouped by role
  main.tsx                # React entry + BrowserRouter + i18n

  i18n.ts                 # i18next setup + language detection
  locales/
    he.json               # Hebrew translations
    en.json               # English translations

  components/
    button/
      button.tsx          # Reusable Button component

  pages/
    Login/
      Login.tsx

    Admin/
      Dashboard/AdminDashboard.tsx
      ControlPanel/ControlPanel.tsx

    Organization/
      Dashboard/OrganizationDashboard.tsx
      VolunteersPage/VolunteersPage.tsx

    User/
      Dashboard/UserDashboard.tsx
      RequestPage/RequestPage.tsx
      MyRequest/MyRequest.tsx

  services/
    RequestedPage/requestedPage.service.ts  # Districts, cities, categories, localStorage helpers

  styles/
    main.scss               # Global styles + helpers
    ...                     # Base, layout, variables, etc.
```

---

## Development notes

- The request wizard logic is mostly in `RequestPage.tsx`.
- Shared constants / helpers (districts, cities, categories, localStorage) live in  
  `requestedPage.service.ts`.
- The last submitted request is stored under a dedicated key in `localStorage`  
  and is read by `MyRequest` and the summary step.

---

## License

Internal / educational project.  
Usage outside this context should be coordinated with the project owner.
