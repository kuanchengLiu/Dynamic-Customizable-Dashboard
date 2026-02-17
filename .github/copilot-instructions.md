# Copilot instructions for Dynamic Customizable Dashboard

## Project status & scope
- This repo currently contains a specification only (no React/TS source yet). Treat [README.md](README.md) as the source of truth for architecture, data models, and UI flows.
- The system architecture diagram is in [graph TD.mmd](graph%20TD.mmd) (Mermaid flow).

## Intended architecture (from spec)
- Frontend is React 18 + TypeScript with Tailwind CSS.
- Layout is a 12-column grid using `react-grid-layout` with drag/resize and responsive single-column on mobile.
- State management is intended to use Zustand for dashboard config.
- Data fetching is intended to use TanStack Query; forms via React Hook Form.
- Widgets can use a global API config or override with per-widget local config.
- REST (GET/POST) and GraphQL must both be supported by a generic fetcher hook.

## Core data models (from spec)
- `ApiConfig` captures endpoint, REST/GraphQL type, method, headers, body/query, and variables.
- `Widget` includes `layout` (react-grid-layout `i/x/y/w/h`), `useGlobalEndpoint`, optional `localApiConfig`, and `viewType`.
- `DashboardState` includes `globalApiConfig`, `widgets`, and actions for add/update/remove/updateLayout.

## Component responsibilities (from spec)
- `GridContainer` wraps `react-grid-layout` and emits layout changes.
- `DataFetcher` is a smart component that receives `ApiConfig` and uses React Query for REST/GraphQL.
- `ApiConfigForm` dynamically switches fields based on REST vs GraphQL selection.
- `VisualizationLayer` switches among JSON/Table/Chart views.

## Guidance for future code additions
- Keep new files aligned with the README’s component names and responsibilities.
- When adding the data layer, preserve the global vs local API config precedence.
- If you introduce build/test scripts, document them in README and update this file accordingly.
