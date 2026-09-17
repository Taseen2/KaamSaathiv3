# KaamSaathi

> **Cooperative Gig Services Web Platform for Household & Community Services**

---

## Project Objectives

- Connect verified cooperative workers with households and institutions requiring local services.
- Digitise registration, skill profiling, certification, booking, scheduling, payments, and invoicing.
- Match customers with suitable workers using geolocation, skills, availability, and service requirements.
- Ensure fair wages, worker welfare, insurance support, and transparent service transactions.
- Build consumer trust through worker verification, ratings, feedback, and digital records.
- Support emergency and on-demand service bookings via a responsive web portal.
- Enable Labour Cooperative Federations and Societies to manage workers and services through an administration dashboard.
- Improve workforce utilisation using AI-based demand forecasting and allocation.
- Provide an accessible multilingual web platform using cloud, AI, geospatial, and digital payment technologies.

---

## Technology Stack (Current vs Planned)

| Layer | Currently Implemented | Planned in Architecture | Notes / Status |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Vite 8** + **TypeScript** | React (Vite) + TypeScript | **Active & running** on `http://localhost:5173/` |
| **Styling & Design** | **Pure Vanilla CSS** (Design system with CSS variables in `frontend/src/index.css`) | CSS / Bootstrap / Tailwind | Strict institutional cooperative design system; no Tailwind |
| **Icons & Media** | **Lucide-react 1.47**, Canvas Confetti | Lucide icons | Official stamps, badge seals, icons |
| **Maps & Geolocation** | **Leaflet.js 1.9** + OpenStreetMap + Canvas markers | Leaflet + OpenStreetMap | Free, open-source geo-matching without billing accounts |
| **Typography** | **Google Fonts** (`PT Serif`, `IBM Plex Sans`, `IBM Plex Sans Devanagari`, `IBM Plex Mono`) | Google Fonts | Civic gazette aesthetic |
| **State Management** | **React Context API** (`AppContext.tsx`) with `localStorage` persistence | Context API + REST APIs | Full mock state & reactive workflow |
| **Internationalization** | Custom **Bilingual Engine** (`translations.ts` in EN / हिन्दी) | i18next | Instant Hindi / English toggle |
| **Backend Server** | *Scaffolded folders only* (`.gitkeep`) | **Node.js** + **Express** | Ready to be initialized |
| **Database** | *Mock Data Store* (`initialData.ts` + `localStorage`) | **PostgreSQL** (via Supabase) | DB schema and connection to be built |
| **Auth** | Mock Role Switcher (Customer, Worker, Admin) | **JWT + bcrypt** (or Firebase Auth) | Secure token-based auth to be implemented |
| **AI / ML Service** | *Scaffolded folders only* (`.gitkeep`) | **Python** (FastAPI/Flask + scikit-learn) | AI demand forecasting microservice to be developed |
| **Payments** | Simulated cooperative wage breakdown & mock checkout | **Razorpay** (Test/Sandbox mode) | Free test mode for testing Indian payment rails |
| **OTP / Notifications** | Simulated 4-digit service start OTP & dispatch bell | **Email OTP via Nodemailer** (Gmail SMTP) | Free alternative for verification & booking alerts |
| **Hosting** | Local development (Vite dev server) | **Vercel/Netlify** (frontend) + **Render** (backend) + **Supabase** (DB) | Zero cost cloud deployment |
| **Version Control** | **Git** + **GitHub** | Git + GitHub | Team collaboration and version tracking |

---

## Team Structure (5 members)

- **2 members — Frontend (React):** customer-facing UI and worker/admin dashboards.
- **2 members — Backend (Node.js/Express + PostgreSQL):** APIs, authentication, booking logic, payments integration.
- **1 member — AI/ML module, geo-matching logic, and documentation/report coordination.**

> All members should be comfortable with Git/GitHub regardless of role, to avoid bottlenecks in a 5-person team.

---

## 6-Month Development Roadmap

| Month                                                      | Focus & Deliverables                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Month 1 — Learn + Plan**                                 | Focused learning on React, Express/REST APIs, and SQL/PostgreSQL basics. Finalize requirements: user roles (customer, worker, admin), core entities (users, workers, bookings, services, payments, ratings), an ER diagram, and wireframes. Set up GitHub repo, project board, and coding conventions. |
| **Month 2 — Core Backend + Auth**                          | Build the Express API skeleton: registration/login for all roles, JWT auth, worker profile + skill/certification fields, basic CRUD for services. Set up PostgreSQL schema on Supabase. Deploy an early version to Render to establish the deployment habit early.                                     |
| **Month 3 — Core Frontend + Booking Flow**                 | Build React pages for registration/login, worker browsing, booking form, and role dashboards. Connect frontend to backend APIs. Get the full **'customer books a worker'** path working end-to-end — this is the functional MVP checkpoint.                                                            |
| **Month 4 — Geo-Matching, Payments, Notifications**        | Add Leaflet map integration for location-based worker discovery (distance + skill + availability filters). Integrate Razorpay test mode for payment simulation and invoicing. Add email OTP for verification and booking confirmations. Typically the hardest month — start early.                     |
| **Month 5 — AI Forecasting, Ratings, Multilingual, Admin** | Build the AI demand-forecasting microservice and connect it to the admin dashboard. Add ratings/feedback and worker verification status. Add i18next for at least two languages. Polish the admin dashboard for cooperative/federation management.                                                     |
| **Month 6 — Testing, Polish, Documentation, Demo Prep**    | Bug fixing, UI polish, responsive/mobile testing, and writing the project report (architecture diagrams, ER diagrams, screenshots, tech justification). Prepare and rehearse a scripted demo at least twice before submission.                                                                         |

---

## Practical Notes

- Do not attempt full depth on all nine objectives. Pick **2–3 standout features** to polish (geo-matching and AI forecasting are strong choices) and keep the rest functional but simple.
- Start deploying from **Month 2**, not Month 6 — teams that delay deployment tend to hit last-minute environment issues right before the demo.
- Maintain a shared API reference (endpoints, request/response shapes) so frontend and backend members are never blocked waiting on each other.
- Budget slack time around **Month 4** (geo-matching + payments + notifications together) — it is the most likely point to fall behind schedule.

---

## Detailed Month-by-Month Task Breakdown by Member

### Month 1 — Learn + Plan

#### Member 1 — Frontend

- Complete a React fundamentals crash course (components, props, state, hooks).
- Set up the React + Vite project skeleton and folder structure.
- Explore Bootstrap/Tailwind and decide on the base UI component approach.

#### Member 2 — Frontend

- Learn React Router for page navigation and layout structure.
- Create wireframes/mockups (Figma or paper) for customer, worker, and admin flows.
- Draft the site map / page list for the whole app.

#### Member 3 — Backend

- Learn Node.js and Express fundamentals; understand REST API design.
- Set up the Express server skeleton with folder structure (routes/controllers/models).
- Define the initial list of API endpoints needed across the app.

#### Member 4 — Backend

- Learn SQL basics and PostgreSQL fundamentals.
- Create the Supabase project and explore its dashboard/SQL editor.
- Design the initial ER diagram: users, workers, services, bookings, payments, ratings.

#### Member 5 — AI/ML & Coordination

- Research simple demand-forecasting approaches (linear regression/time-series) suitable for the dataset size.
- Set up the GitHub repository, branch strategy, and project board (columns: **To Do / In Progress / Done**).
- Start drafting the project proposal document skeleton (objectives, scope, stack justification).

### Month 2 — Core Backend + Auth

#### Member 1 — Frontend

- Build the login and registration UI screens (customer, worker, admin).
- Connect these screens to the backend auth APIs once available.
- Handle basic form validation and error messages on these screens.

#### Member 2 — Frontend

- Build the shell layouts and routing for customer, worker, and admin dashboards.
- Set up an auth state management approach (Context API or Redux) to store the logged-in user/token.
- Add a protected-route wrapper so dashboards require login.

#### Member 3 — Backend

- Build registration/login endpoints with JWT issuing and password hashing (bcrypt).
- Write role-based auth middleware (customer/worker/admin permissions).
- Write basic input validation for all auth endpoints.

#### Member 4 — Backend

- Implement the PostgreSQL schema (users, workers, services tables) on Supabase.
- Connect Express to Supabase (via pg or an ORM such as Prisma).
- Build CRUD APIs for worker profile, skills, and certification fields.

#### Member 5 — AI/ML & Coordination

- Set up backend deployment on Render and frontend deployment on Vercel/Netlify.
- Create and maintain the shared API reference sheet (endpoint, method, request/response shape) as APIs are built.
- Start collecting or generating sample booking data to use later for the forecasting model.

### Month 3 — Core Frontend + Booking Flow

#### Member 1 — Frontend

- Build the worker browsing/search page with filter inputs (skill, availability).
- Build the service booking form UI and connect it to the booking API.
- Handle loading and empty states on the search page.

#### Member 2 — Frontend

- Build the customer dashboard (booking history, status) and worker dashboard (assigned jobs).
- Build the admin dashboard's basic view (list of users/workers/bookings).
- Connect all three dashboards to their respective backend list APIs.

#### Member 3 — Backend

- Build booking APIs: create booking, update status, list bookings by user/worker.
- Build service listing CRUD APIs (add/edit/remove service types).
- Write status-transition logic (**pending → confirmed → completed/cancelled**).

#### Member 4 — Backend

- Build worker availability/schedule tables and APIs.
- Write booking validation logic (conflict checks, availability checks).
- Add database indexes/constraints needed for booking queries.

#### Member 5 — AI/ML & Coordination

- Coordinate and run end-to-end testing of the full **'customer books a worker'** flow across both frontend and backend.
- Start drafting architecture and data-flow diagrams for the report.
- Build a small dummy/synthetic booking dataset structure to prepare for the forecasting module.

### Month 4 — Geo-Matching, Payments, Notifications

#### Member 1 — Frontend

- Integrate Leaflet map into the worker search page.
- Display worker markers on the map and sort/filter results by distance.
- Add a **'use my location'** control for the customer.

#### Member 2 — Frontend

- Build the payment/checkout UI screen integrating the Razorpay checkout widget (test mode).
- Build the booking confirmation screen and a simple invoice display/download view.
- Add UI states for payment success/failure.

#### Member 3 — Backend

- Implement Razorpay test-mode integration: order creation and payment verification.
- Build invoice generation logic (store and retrieve invoice records).
- Handle payment webhook/callback and update booking payment status.

#### Member 4 — Backend

- Implement geo-matching logic: distance calculation from lat/long (**Haversine formula**) between customer and workers.
- Build the combined filter/sort query (**skill + distance + availability**).
- Optimize the query with appropriate PostgreSQL indexes.

#### Member 5 — AI/ML & Coordination

- Set up the Nodemailer email OTP service (Gmail SMTP) for verification.
- Integrate the OTP flow into registration and booking confirmation.
- Document the payment and geo-matching flow with diagrams for the report.

### Month 5 — AI Forecasting, Ratings, Multilingual, Admin

#### Member 1 — Frontend

- Build the rating/feedback UI shown after a booking is marked completed.
- Display aggregated worker ratings on profile and search result cards.
- Polish the customer-side flow end-to-end based on feedback so far.

#### Member 2 — Frontend

- Build the admin dashboard UI for worker verification approval and management.
- Add a simple forecast chart view (using a charting library) fed by the AI microservice's output.
- Integrate i18next and add English/Hindi toggle across the app's key screens.

#### Member 3 — Backend

- Build the ratings/feedback API (submit rating, compute aggregated worker rating).
- Build the worker verification status workflow (**pending/verified/rejected**) for admin use.
- Add supporting endpoints the admin dashboard needs (approve/reject worker).

#### Member 4 — Backend

- Build admin management APIs: manage workers, services, and cooperative/federation records.
- Build the endpoint that calls the AI microservice and returns forecast data to the frontend.
- Review and tighten data validation across all APIs built so far.

#### Member 5 — AI/ML & Coordination

- Build the Python microservice (Flask/FastAPI) with a scikit-learn regression/time-series model trained on booking history.
- Expose a forecasting API endpoint and connect it to the Node backend.
- Coordinate multilingual content review (translations) with the team.

### Month 6 — Testing, Polish, Documentation, Demo Prep

#### Member 1 — Frontend

- Fix bugs and polish UI across all customer-facing screens.
- Test responsiveness on mobile/tablet screen sizes.
- Run cross-browser checks (Chrome, Firefox, Edge at minimum).

#### Member 2 — Frontend

- Fix bugs and polish UI across worker and admin dashboards.
- Check accessibility basics (labels, contrast, keyboard navigation).
- Help prepare demo screen recordings/screenshots for the report.

#### Member 3 — Backend

- Review and harden API error handling and input validation.
- Run basic load/performance checks on key endpoints (booking, search).
- Fix backend bugs surfaced during full-system testing.

#### Member 4 — Backend

- Review database queries for performance (especially geo-matching and search).
- Fix backend bugs surfaced during full-system testing.
- Prepare the ER diagram and schema documentation for the report.

#### Member 5 — AI/ML & Coordination

- Compile the final project report: architecture diagrams, ER diagram, screenshots, tech justification.
- Write and rehearse the demo script covering registration, booking, payment, matching, and the admin/AI dashboard.
- Coordinate at least two full dry-run rehearsals with the whole team before submission.
