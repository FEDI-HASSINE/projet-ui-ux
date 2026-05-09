# ATTT Appointment Booking (Frontend)

Modern, production-quality front-end prototype for a technical vehicle inspection booking flow. Built with React + Vite, Tailwind CSS, React Router, and static data only.

## Highlights
- 6-step booking flow plus a home entry screen
- Bilingual UI copy (FR/EN) with clear step guidance
- Local state persisted to localStorage for resume
- Motion transitions for smooth navigation
- Mobile-first, SaaS-style card layout

## User Flow
1. Home
2. Service Choice
3. Center Choice
4. Date & Time Selection
5. Personal Info
6. Summary
7. Confirmation

## Architecture
- src/app/context/BookingContext.tsx
  - Central booking state, localStorage persistence, reset behavior
- src/app/data/booking.ts
  - Static services, centers, time slots, and step labels
- src/app/components
  - Reusable UI (Button, SelectableCard, StepHeader, BilingualText, FormField)
- src/app/screens
  - Flow screens for each step
- src/styles
  - Theme tokens, Tailwind setup, fonts

## Run Locally
```bash
pnpm install
pnpm dev
```

Optional build:
```bash
pnpm build
```

## Demo Script (2 minutes)
0:00 - 0:15
- Open the home screen: highlight the SaaS look, bilingual copy, and clear CTA.

0:15 - 0:40
- Start booking. Pick a service and note the selection cards and stepper progress.

0:40 - 1:05
- Choose a center with availability badges and search filtering.
- Move to date/time and show disabled slots plus calendar navigation.

1:05 - 1:30
- Fill the user form (full name, CIN, phone, vehicle info).
- Trigger validation to show clear error messaging.

1:30 - 1:50
- Review the summary and use edit shortcuts to jump back to any step.
- Confirm the booking to generate the reference number.

1:50 - 2:00
- Show confirmation screen, action buttons, and localStorage resume behavior.
- Wrap with tech stack and UX goals.
