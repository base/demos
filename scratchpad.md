# Project: BaseLaunch

[PLANNER READ COMPLETE - 2025-12-05T00:00:00Z]
[EXECUTOR READ COMPLETE - 2025-12-05T00:15:00Z]

## Background and Motivation

BaseLaunch is a production-ready Base mini app (Frames v2) for discovering and distributing Base ecosystem apps. It must be mobile-first with Coinbase Base aesthetic, deliver value before auth, and meet strict standards (WCAG 2.1 AA, Lighthouse 90+, <1.5s initial load, no local/session storage). Users browse 50 curated apps, search/filter, open detail modals, share to Farcaster, preview weekly digest emails, and developers manage a waitlist wizard with referral/milestone features. Auth (SIWF) and wallet connections are progressive and non-blocking, defaulting to Base Account but offering alternatives.

## Key Challenges and Analysis

- Experience gating: Must show discovery feed instantly without auth; SIWF triggers only on protected actions (save, share, dashboard saves). Wallet connect only when required for onchain actions; Base Account default with alternatives.
- Performance: Meet <1.5s FCP and <500KB initial bundle; need SSR/edge rendering, lazy data slices, IntersectionObserver card reveals, debounced search, optimized images, and minimal JS on initial view.
- Accessibility: WCAG 2.1 AA, keyboard/focus management, ARIA labels, focus traps in modals, visible focus indicators, color contrast for both light/dark modes.
- State/data: 50 static app objects (id, name, category, metrics, tags, URLs). Derived views for search/filter/trending badges; avoid localStorage; prefer server data or in-memory state per session.
- UI system: Shared design tokens for light/dark palettes, spacing, typography, motion tokens (ease, durations). Card layout, modals, wizard, share modal, digest preview must adhere to Base aesthetic and animation standards (GPU-friendly transforms/opacity).
- Frames/Farcaster: Need frames manifest (`/frames.json` or `/.well-known/farcaster.json`), home/preview images, button title, webhook URL placeholder. Must avoid auth walls in frame experience.
- Security: HTTPS-only assumptions, CSP headers, no API keys client-side, sanitize any user text (e.g., share/digest inputs), no storage of sensitive data.
- Testing/TDD: Every feature requires tests first (component/render, accessibility behaviors, state logic). Plan for Jest/React Testing Library (or Next testing setup) with jsdom, plus lint/type checks.

## High-level Task Breakdown

- [ ] Task 1: Choose base template and project scaffolding (Next.js app router + TypeScript + Tailwind/OnchainKit/MiniKit as needed); establish lint/test tooling.
  - Success Criteria: Project boots locally (`npm run dev`), lint/test commands exist and run; app router layout with global styles and design tokens ready.
- [ ] Task 2: Establish design system (tokens for colors, typography, spacing, radii, motion; light/dark mode support).
  - Success Criteria: Theme provider or CSS variables in place; global styles apply Base palette; dark/light toggle works; contrast meets WCAG.
- [ ] Task 3: Seed data and domain models for 50 apps.
  - Success Criteria: App schema implemented; static dataset loaded server-side; utilities for search/filter/trending scoring with tests.
- [ ] Task 4: Discovery feed with search/filter.
  - Success Criteria: Grid/list renders 50 apps with lazy reveal animations, category chips, debounce search, result count; keyboard and screen reader accessible; no auth required.
- [ ] Task 5: App detail modal with accessibility.
  - Success Criteria: Modal shows full details (metrics, developer info, actions), focus trap, ESC/overlay close, returns focus, responsive layout, tests cover open/close/focus management.
- [ ] Task 6: Save/share interactions with progressive auth (SIWF).
  - Success Criteria: “Save” toggle gated by SIWF modal; guest browsing unaffected; SIWF uses `@farcaster/auth-kit` placeholder wiring; clear copy explaining benefit; tests ensure auth not prompted on load.
- [ ] Task 7: Developer dashboard waitlist wizard (5 steps).
  - Success Criteria: Stepper with validation, referral config, milestones/badges, launch date picker with live countdown, referral link + QR, copy-to-clipboard toast, milestone progress/confetti hook; tests for step navigation and validation.
- [ ] Task 8: Share-to-Farcaster modal.
  - Success Criteria: Four templates, radio selection, editable textarea with counter and emoji shortcuts, hashtag toggle, preview/copy actions; tests for char limits and state.
- [ ] Task 9: Weekly digest email preview.
  - Success Criteria: Frequency + category checkboxes + toggles, live preview rendering all sections, respects choices; tests ensure selections reflect in preview.
- [ ] Task 10: Frame manifest + routing + performance/accessibility hardening.
  - Success Criteria: `frames.json` (and/or `/.well-known/farcaster.json`) present with required fields; meta tags for OG and frame; CSP headers configured; Lighthouse/perf budgets documented; no console errors; keyboard navigation verified.

## Current Status / Progress Tracking

- Mode: Executor
- Current focus: Task 1 (scaffold Next.js app-router + TS + Tailwind with lint/test tooling) pending workspace location/package-manager confirmation.

## Project Status Board

- [ ] Task 1: Scaffold Next.js app router + TS + Tailwind with lint/test tooling
  - [ ] Test written: scaffold smoke (app renders home, lint/test commands wired)
  - [ ] Implementation complete
  - [ ] Test passed
  - [ ] Planner verified: [ ]

## Executor's Feedback or Assistance Requests

- Need confirmation on scaffold location and package manager before proceeding:
  - Preferred directory name (e.g., `baselaunch-app` or reuse/replace existing `baselaunch/` static site?)
  - Package manager: npm vs pnpm vs yarn?
  - Any required SDKs preinstalled (OnchainKit/MiniKit/AuthKit) for initial scaffold or add later?

## Lessons

- To record best practices and pitfalls as they arise.

## External Data Log

- Spec source: BaseLaunch complete specification provided by user.
