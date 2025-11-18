# FounderOps Assistant — Refined PRD

## Gaps & Risk Callouts from the Draft
- **Assumption: always-available LLM + live news** without latency/cost limits; needs guardrails for offline modes and capped API usage.
- **Unclear data permissions** for calendar, drive, and news sources; must define data residency, opt-ins, and per-scope revocation.
- **Scheduling authority risk**: auto-committing calendar blocks could create user distrust; default to suggestions + explicit confirms.
- **Market signal noise**: unclear sourcing quality and freshness; must score sources, allow source curation, and expose confidence.
- **Prioritization algorithm** undefined: need transparent scoring based on impact, effort, urgency, runway, and objectives.
- **Success metrics** too generic: need activation, retention, planning accuracy, schedule adherence, and completion velocity metrics.
- **Competitive overlap** with Notion/Motion/Asana/Linear/Reclaim: needs distinct wedge (strategy-aware autoplan + market signals).
- **Privacy & compliance**: handling of founders' research and investor data requires encryption, role-based access, and audit trails.
- **Onboarding complexity**: unclear first-value moment; must ship fast-path guided setup using one idea + calendar connect.

## Refined Product Definition

### Problem & Goal
Founders lack a trusted, always-on planner that ties **strategy → plan → calendar → execution** while adapting to live market signals. Goal: deliver daily plans that founders follow because they feel **relevant, feasible, and transparent**.

### Target Users
- Solo founders and 1–5 person startup teams in pre-seed/seed stages.
- Accelerator/uni cohorts needing structured execution habits.
- Product leads running validation sprints for new bets.

### Value Proposition
- Strategy-aware autoplan that converts messy ideas into **prioritized, calendar-ready work**.
- Market-aware recommendations that keep the plan aligned with **external signals**.
- Trust via **transparency**: show why tasks are prioritized, confidence, and expected effort.

### Scope & Priorities
- **MVP (0–3 months)**: guided intake for one project, transparent priority scoring, daily plan with confirm-to-schedule, Google Calendar sync (suggestions only), manual time logging, structured project view, notifications.
- **V1 (3–6 months)**: auto time detection (opt-in), market signal ingestion + confidence scores, backlog grooming, weekly review, velocity insights, lightweight templates (Lean Canvas, MVP scope), Slack/Email digests.
- **V2 (6–12 months)**: team mode with roles, shared objectives/OKRs, investor update drafts, experiment library, integrations for code/issues (Linear/GitHub), funding tracker.

### Core Feature Set (MVP/V1 detail)
- **Guided Idea Intake**: short interview to capture goal, audience, constraints; produces project skeleton and initial backlog.
- **Priority Engine**: scores tasks using impact, effort, urgency, dependencies, runway, and market-signal multiplier; exposes rationale.
- **Daily Plan Builder**: proposes a day plan; users confirm/adjust before calendar writes; reschedules on conflicts.
- **Calendar Assist**: Google Calendar read; write only after user confirm; respects working hours, buffers, and focus windows.
- **Market Sync**: curated news/feeds by sector; deduplicates, ranks confidence, and suggests plan adjustments; user-tunable noise filters.
- **Progress & Time**: manual logging + optional desktop timer; weekly report on schedule adherence, slip reasons, and velocity.
- **Templates & Frameworks**: Lean Canvas, MVP checklist, customer interview kit; attach to tasks/milestones.

### Non-Goals (MVP)
- Full doc editing (leave to Notion/Google Docs).
- Complex resource planning or HR/payroll.
- Automated investor outreach.

### Success Metrics
- **Activation**: % of new users who connect calendar and create first project within 24h (target 60%).
- **First value**: median time-to-first accepted daily plan (target <15 minutes from signup).
- **Engagement**: weekly active planners (opened daily plan ≥3 days/week) (target 40% of actives).
- **Plan adherence**: % of scheduled blocks completed as planned (target 65% in 4 weeks).
- **Throughput**: median tasks completed/week per active project; track slip rate.
- **Quality**: user-rated usefulness of daily plan (CSAT 4.3/5+) and signal relevance (4.0/5+).
- **Revenue**: conversion to paid after 30 days (target 10%).

### Strategic Risks & Mitigations
- **Trust & control**: users fear auto-changes → default to suggestions, changelog, and granular permissions.
- **Signal fatigue**: noisy news → curated sources, sector profiles, confidence scoring, and a "why this matters" explanation.
- **LLM cost/latency**: use task-specific prompts, caching, and smaller models for ranking; degrade gracefully offline.
- **Data privacy**: encrypt at rest/in transit; scoped tokens for calendar/docs; minimal retention; admin audit log.
- **Adoption friction**: deliver a day-one wizard that builds the first plan from one idea + next 3 steps; tutorial checklist.

### Go-To-Market Notes
- Wedge on **strategy-aware autoplan + market sync** rather than generic task lists.
- Target channels: accelerators, founder communities, indie hacker forums, and co-working spaces; offer cohort analytics for partners.

## 10 Core Differentiators vs. Notion, Motion, Asana, Linear, Reclaim.ai
1. **Strategy-to-calendar bridge**: converts Lean Canvas/MVP inputs directly into scheduled work blocks with rationale.
2. **Market-aware prioritization**: task scores adjust with curated sector signals and confidence, not just deadlines.
3. **Transparent priority math**: visible impact/effort/urgency/runway scoring and explanation for every suggestion.
4. **Confirm-first scheduling**: safe-by-default calendar writes; changelog and rollback for trust.
5. **Day-one value wizard**: turns a single idea into a 1-week plan in minutes, minimizing setup.
6. **Focus protection engine**: protects maker hours with buffers, conflict-aware rescheduling, and Pomodoro presets.
7. **Execution health analytics**: adherence, slip reasons, and velocity per initiative—lightweight, founder-friendly.
8. **Curated frameworks library** integrated into tasks (Lean Canvas, experiments, interviews) without becoming a document suite.
9. **Runway-aware planning**: aligns workload with target milestones (e.g., MVP-in-6-weeks) and investor timelines.
10. **Source-tunable market feed**: founders choose sources and noise level; AI explains why each update matters.

## MVP Prioritization (RICE) and Scope for 4–6 Weeks

### RICE Scoring
| Feature | Reach (4–6 wk users) | Impact on goal (1–3) | Confidence (0–1) | Effort (person-weeks) | RICE Score |
| --- | --- | --- | --- | --- | --- |
| Guided idea intake → project skeleton | 120 signups | 2.0 | 0.75 | 1.0 | 180 |
| Priority engine (impact/effort/urgency/runway scoring) | 100 active planners | 2.5 | 0.6 | 1.5 | 100 |
| Daily plan builder (confirm-to-schedule) | 100 active planners | 3.0 | 0.7 | 2.0 | 105 |
| Calendar assist (GCal read + suggested blocks, no auto-write) | 100 active planners | 2.0 | 0.65 | 1.0 | 130 |
| Project dashboard/backlog with milestones & statuses | 120 signups | 1.5 | 0.8 | 0.8 | 180 |
| Manual time logging + simple adherence report | 80 active planners | 1.0 | 0.6 | 0.8 | 60 |
| Notifications/daily email digest | 80 active planners | 1.5 | 0.7 | 0.5 | 168 |
| Market signal intake (curated feeds, no auto-prioritize) | 50 active planners | 1.5 | 0.4 | 1.5 | 20 |

*Notes*: Reach based on expected early adopters; Impact reflects contribution to “plan adherence and perceived relevance”; Confidence based on technical unknowns; Effort assumes 2–3 engineers + 1 designer/PM.

### MVP Definition (engineer-buildable in 4–6 weeks)
- **Guided idea intake** that outputs a structured project skeleton (problem, goals, first 10 tasks).
- **Project dashboard/backlog** with milestones, statuses, and lightweight priority fields.
- **Priority engine v1** that scores tasks using impact/effort/urgency/runway; exposes rationale in UI.
- **Daily plan builder** that proposes a day plan and requires user confirmation before scheduling.
- **Calendar assist** with Google Calendar read + suggested time blocks respecting working hours; manual confirm writes.
- **Notifications/daily digest** summarizing today’s plan and changes; links back to confirm blocks.
- **Manual time logging** per task with a basic weekly adherence report.

*Deferred (post-MVP)*: automated time detection, market-signal-driven reprioritization, advanced templates, team mode, experiment library, investor updates, and auto-rescheduling.

## Information Architecture (MVP UX)

### Global Navigation
- **Today** (default): daily plan, confirmations, and changelog.
- **Projects**: list of projects with health indicators; access to project spaces.
- **Backlog**: task/milestone lists with priority scores and filters.
- **Calendar Assist**: suggested blocks, conflicts, and confirmation queue.
- **Reports**: weekly adherence/time summary.
- **Signals**: curated sector updates and impact suggestions (read-only in MVP).
- **Settings**: account, calendar connection, working hours, notification prefs.

### Screens / Pages
- **Today (Home)**: today’s prioritized tasks, suggested blocks awaiting confirmation, quick accept/decline, rationale drawer, and mini progress chart.
- **Project Space**: project overview (goal, timeframe), milestones, backlog filtered to the project, and the guided intake wizard entry point.
- **Guided Intake Wizard**: stepper capturing goal, audience, constraints, timeline; outputs project skeleton and initial tasks.
- **Backlog View**: sortable list with priority score breakdown, status chips, tags (Research/Plan/Build/Ops), and inline time estimates.
- **Calendar Assist**: read-only calendar with proposed blocks, conflict alerts, and one-click confirm/adjust to write to Google Calendar.
- **Reports**: weekly adherence report (planned vs. completed blocks), time logged per category, and slip reasons entry.
- **Signals Feed (lightweight)**: curated industry links with manual “add note/task” action; no auto-prioritization in MVP.
- **Settings**: working hours, focus windows, calendar connection status, notifications, data permissions.

### System-Level Components
- **Top nav + project switcher** persisting across views.
- **Rationale panel** showing priority math (impact/effort/urgency/runway) and proposed schedule logic.
- **Confirmation drawer** for scheduling actions (accept/decline/reschedule suggested blocks).
- **Task card** with status, priority score, estimate, tags, and log-time action.
- **Milestone capsule** aggregating linked tasks and target dates.
- **Timer/log widget** for manual time entry and adherence notes.
- **Notification center** (digest + in-app nudges) linked back to Today/Calendar Assist.

### Required Data Per View
| View | Data Required | Source |
| --- | --- | --- |
| Today | today’s tasks with scores, suggested blocks, conflicts, rationale snippets, completion state | backlog DB, priority engine, calendar read |
| Project Space | project metadata (goal, horizon), milestones, backlog items, progress summaries | project table, milestone table, task/backlog table |
| Guided Intake | user inputs (goal, audience, constraints), generated project skeleton, initial tasks | intake form, LLM generation, task table |
| Backlog View | tasks with attributes (priority score breakdown, status, estimate, tags), filters | task/backlog table, priority engine |
| Calendar Assist | read-only events, proposed blocks, conflict detection results | Google Calendar read, scheduling service |
| Reports | time logs, planned vs. completed blocks, adherence calculations, slip reasons | time log table, calendar writes, tasks |
| Signals Feed | curated links, sector tags, relevance/confidence score, user-added notes | signals service, metadata store |
| Settings | working hours, focus windows, calendar connection state, notification preferences, permissions | user profile table, auth/credentials store |

### Flow Diagram (Text)
1. **Intake** → User opens **Guided Intake Wizard** → enters goal/audience/constraints → system generates project skeleton + first tasks → saved to **Project Space**/**Backlog**.
2. **Prioritize** → Priority engine scores tasks (impact/effort/urgency/runway) → scores appear in **Backlog View** and **Today**.
3. **Plan Day** → User opens **Today** → sees suggested tasks + proposed blocks from **Calendar Assist** → opens **Rationale panel** as needed.
4. **Schedule** → User confirms/adjusts blocks via **Confirmation drawer** → writes to Google Calendar → updates **Today** and **Reports** sources.
5. **Execute & Log** → User works from **Today**/**Calendar Assist** → logs time via **Timer/log widget** on task cards → updates adherence metrics.
6. **Review** → **Reports** show weekly adherence and time distribution → user adjusts working hours/settings as needed.
7. **Learn** (lightweight) → User checks **Signals Feed** → may add notes/tasks manually → stored in **Backlog** for future prioritization.

## Wireframe Specifications (MVP fidelity for designers)

All measurements assume a 12-column grid, 1280 px wide canvas, 16 px base spacing, and 14 px body text with 20 px line height unless noted.

### Project Dashboard
- **Layout**: 12-col grid; content max-width 1200 px centered. Top margin 24 px.
- **Header bar**: Height 72 px; left: Project title (24 px semibold), status chip (12 px label, 4 px radius), date range text (14 px). Right: "Edit project" ghost button (40 px height, 12 px padding), overflow menu (icon button 32 px).
- **Summary row** (below header, 16 px gap): three cards each 360 px wide x 120 px height, 12 px radius, 16 px padding. Cards: Progress ring (64 px), KPI label (12 px all caps), value (20 px bold), subtext (12 px muted).
- **Two-column body** (top aligned, 24 px gap):
  - **Left column (8 cols, 760 px)**: "Milestones" section header (18 px bold, 12 px bottom margin); list of milestone capsules (full width, 16 px padding, 8 px gap) with title, target date (12 px), progress bar (4 px height, 8 px radius), and linked task count.
  - **Right column (4 cols, 380 px)**: "Next Best Actions" panel (card 16 px padding, 12 px radius). Each action row: priority score chip (32 px wide), task title (14 px), rationale link (12 px blue), accept/decline icon buttons (28 px) aligned right.
- **Backlog preview** (full width, 24 px above footer): table with sticky header 44 px height. Columns: Task (left aligned), Status (chip), Priority (score + icon), Estimate, Tag. Row height 48 px, 12 px vertical padding.
- **Spacing**: Sections separated by 24 px vertical rhythm. Internal row gaps 8–12 px.

### Calendar Sync View (Calendar Assist)
- **Layout**: 2-column split; left 8 cols (week/day calendar), right 4 cols (suggested blocks list). Top bar 64 px height with view toggle (Day/Week), date selector, and "Sync status" pill.
- **Calendar grid**: Week view default. Time axis 60 px width; columns for days each ~140 px. Hour rows 60 px height with 4 px divider. Working hours shaded (10% gray). Existing events: solid fill with 8 px radius, 8 px padding. Proposed blocks: dashed outline (#3B82F6) 2 px stroke, 8 px radius, 12 px internal padding showing task name (14 px) + duration.
- **Conflict badges**: Red dot (8 px) on block top-right if overlap; tooltip on hover (280 px max width, 12 px text).
- **Right panel**: Title "Proposed blocks" (16 px semibold). List items 64 px height, 12 px padding, 8 px gap. Each item: task title, priority chip, proposed time, "Accept" primary button (32 px height) and "Adjust" ghost button (32 px). Sticky footer (56 px) with "Confirm all" primary (min 160 px).
- **Spacing**: 24 px gutter between calendar and right panel; 16 px internal padding.

### AI Breakdown Assistant (Guided Intake)
- **Layout**: Centered modal/wizard, 960 px width, 24 px padding, 12 px radius, stepper at top.
- **Stepper**: Horizontal, 5 steps (Idea, Goal, Audience, Constraints, Output). Each step circle 20 px with 2 px stroke; label 12 px below; 32 px gap.
- **Form body**: 2-column form (6 cols each) with 16 px column gap. Fields use 14 px labels (600 weight), 8 px above inputs. Inputs 44 px height, 12 px internal padding, 8 px radius. Textareas 120 px height. Helper text 12 px muted, 4 px top margin.
- **AI preview pane**: Right side sticky summary (if space allows) 280 px width, showing live breakdown list (bullets, 12 px). Border 1 px #E5E7EB, 12 px radius, 12 px padding.
- **Footer**: Back/Next buttons (44 px height, 16 px padding). Primary button min-width 140 px. Progress hint text 12 px left-aligned.
- **Output step**: Shows generated project skeleton as stacked cards (title + 2-line preview). Each card 320 px wide, 12 px radius, 12 px padding, 8 px gap. "Accept plan" primary button pinned to bottom-right.

### Daily Plan (Today)
- **Layout**: Single column centered, 960 px width. Top margin 24 px. Two stacked panels with 16 px gap.
- **Header strip**: Date selector (inline calendar icon + text 14 px), working hours pill (12 px), and "Plan updated" timestamp (12 px muted) aligned right.
- **Panel 1: Suggested tasks**: Card with 16 px padding, 12 px radius. Title row (16 px bold) + filter chips (12 px) with 8 px gap. Task rows: 56 px height, left checkbox, task title (14 px), priority score chip, estimate, rationale link (underlined 12 px), and two buttons on right: "Add to plan" primary ghost (32 px) and "Snooze" icon button (28 px). Row spacing 8 px.
- **Panel 2: Confirmed schedule**: Card with 16 px padding. Timeline list showing blocks in order. Each block: 60 px height; left time slot (bold 14 px), center task info (title 14 px, location/source 12 px), right-side buttons: "Open" ghost (32 px) and "Edit" icon. Collapsible "Changelog" footer (chevron icon) height 40 px.
- **Floating confirmation drawer**: When selecting a suggested block, slide-up drawer (bottom anchored, height 320 px, 16 px padding). Fields: start/end time pickers (44 px), buffer toggle, calendar selector dropdown. Primary "Schedule" button 44 px height, full width.

### Time Tracking
- **Layout**: Within Today/Projects side panel (right rail 320 px) or dedicated modal 720 px width.
- **Timer widget**: 72 px height card, 16 px padding. Start/Pause button (primary, 44 px height, min 120 px), task selector dropdown (14 px text), elapsed time (24 px bold) center-aligned.
- **Manual log list**: Table style; columns Task, Duration, Date, Notes. Row height 48 px. Inline edit icon (20 px). "Add log" button (32 px height) above table aligned right.
- **Adherence summary**: Mini chart area 280 px width, 140 px height showing planned vs. logged bars. Labels 12 px.
- **Spacing**: 12 px gaps between widgets; consistent 16 px padding on cards; 8 px between table rows.

### Settings
- **Layout**: Two-column settings page; nav rail (left 240 px) and content area (right 880 px). Page padding 24 px.
- **Nav rail**: List items 44 px height, 12 px left padding, active state with 4 px left accent bar (#3B82F6). Sections: Account, Calendar, Working Hours, Notifications, Data & Permissions.
- **Content panels**: Cards 16 px padding, 12 px radius, 1 px border. Section headers 16 px semibold, 8 px bottom margin.
- **Calendar section**: Connection status row (icon + text), "Reconnect" primary button (36 px height), scopes list as checkboxes (GCal read/write) aligned in 2-column grid.
- **Working hours**: Weekday grid 7 columns; each cell 120 px wide, 12 px padding. Time pickers 44 px height. Focus windows toggle + slider (range chips 32 px height).
- **Notifications**: Toggle switches (20 px handle) with label and description (12 px). Digest time dropdown (44 px height).
- **Data & Permissions**: Text block 12 px with link to audit log; "Revoke access" danger button (36 px height) right aligned.
- **Spacing**: Vertical rhythm 16–24 px; form elements spaced by 12 px.

## System Architecture Blueprint (MVP-Oriented)

### Backend Stack
- **Runtime**: Node.js 20 (TypeScript) for API/gateway + background workers (BullMQ/Redis) for scheduling and notifications.
- **Framework**: NestJS (REST + future GraphQL) with feature modules (auth, projects, tasks, scheduling, signals, reports).
- **API Gateway**: REST/JSON + OpenAPI spec; rate-limited via Nginx/Cloudflare; JWT-based auth with OAuth for Google scopes.
- **Background jobs**: Redis-backed queues for calendar proposals, daily plan generation, and webhook processing; cron service for morning plan runs.
- **Observability**: OpenTelemetry traces/metrics, structured logging (pino), and Sentry for exceptions; feature flagging via LaunchDarkly/Open source equivalent.

### Frontend Stack
- **Framework**: Next.js 14 (App Router) + React 18; TypeScript; Tailwind CSS for styling; TanStack Query for data fetching/cache.
- **Component system**: Headless UI/Radix for primitives; recharts for reports; react-big-calendar (or FullCalendar) for calendar assist.
- **State management**: React Query cache + lightweight Zustand store for UI-only state (wizards, drawers).
- **Auth**: NextAuth.js with Google OAuth; session persisted via httpOnly cookies; CSRF protection on mutations.

### Data Model (Postgres)
- **users**: id (uuid), email, name, auth_provider, created_at.
- **credentials**: id, user_id (fk), provider ("google"), access_token (encrypted), refresh_token (encrypted), scopes, expires_at.
- **projects**: id, user_id, title, goal, audience, constraints, timeframe, status, created_at, updated_at.
- **milestones**: id, project_id, title, target_date, status, progress_pct.
- **tasks**: id, project_id, milestone_id (nullable), title, description, status, priority_score, impact, effort, urgency, runway_factor, estimate_minutes, tags (array), source ("ai"|"user"), created_at, updated_at.
- **suggested_blocks**: id, task_id, user_id, start_at, end_at, confidence, status ("proposed"|"accepted"|"declined"), rationale, calendar_event_id (nullable).
- **time_logs**: id, task_id, user_id, duration_minutes, date, note, created_at.
- **signals**: id, user_id, project_id, source, title, url, sector, relevance_score, confidence, summary, created_at.
- **notifications**: id, user_id, type, payload (jsonb), status (pending/sent), scheduled_at, sent_at.
- **audit_events**: id, user_id, entity_type, entity_id, action, metadata (jsonb), created_at.
- **embeddings** (vector DB): record_id, record_type (task/project/signal), content, metadata (ids, sector, tags), vector.

### Vector Embeddings Layer
- **Store**: Qdrant (self-hosted) with collections per record_type; HNSW index, cosine distance.
- **Ingestion**: On project/task/signal creation, generate embedding via small model (e.g., text-embedding-3-small); store metadata for filtering (user_id, project_id, sector, tags).
- **Retrieval**: Similarity search to surface related tasks, rationale context, and signal-to-task matches; capped results with score thresholds.
- **Privacy**: Per-user collections or metadata filters enforcing row-level security; vectors stored without secrets.

### Calendar Integration Flow (Google Calendar)
- **Auth**: OAuth 2.0 with restricted scopes (read-only for discovery; write after user confirms). Store refresh tokens encrypted; rotate access tokens via backend cron/worker.
- **Read pipeline**: Webhook listener for calendar updates → enqueue sync job → fetch events in user working window → cache in Redis for fast conflict checks.
- **Propose blocks**: Scheduling service computes candidate windows respecting working hours, buffers, and existing events; writes to `suggested_blocks` with rationale and confidence.
- **User confirmation**: Frontend surfaces proposals; on accept, API writes event via Google Calendar API, updates `suggested_blocks` status, and logs to `audit_events`.
- **Reschedule/conflict**: On new meeting webhook, scheduler recomputes affected proposals and sends notification/digest.

### AI Task Breakdown Engine
- **Inputs**: Idea prompt + goal/audience/constraints + timeframe; optional sector selection.
- **Pipeline**: (1) Normalize inputs → (2) Retrieve similar projects/tasks via embeddings for grounding → (3) Prompt LLM to produce structured tasks (aligned to Lean Canvas/JTBD) with impact/effort/urgency estimates → (4) Validate schema server-side → (5) Persist tasks and project skeleton.
- **Models**: Use GPT-4.1/4-mini for generation; fall back to distilled model for cost-sensitive steps; deterministic schemas enforced via JSON schema validation.
- **Safety/controls**: Token/time limits, profanity and PII filters on outputs, audit log of prompts/responses.

### Sequence Diagrams (Text)
1. **Idea Intake → AI → Project Creation**
   1. User submits idea/goal in Guided Intake (frontend).
   2. Frontend calls API `/intake` → backend stores draft project.
   3. Backend retrieves similar context from embeddings DB → crafts LLM prompt.
   4. LLM returns project skeleton + tasks → backend validates + scores (impact/effort/urgency/runway).
   5. Backend writes projects/tasks to Postgres, embeddings to Qdrant, audit to `audit_events`.
   6. Frontend receives structured project + backlog; shows confirmation.
2. **Daily Plan Generation**
   1. Scheduled worker (morning cron) loads user backlog, working hours, calendar events from cache.
   2. Priority engine computes scores; scheduling service proposes blocks → writes to `suggested_blocks`.
   3. Notification job sends daily digest with plan link.
   4. User opens Today; frontend fetches suggested blocks and rationale.
   5. User accepts/adjusts; backend writes events to Google Calendar and updates statuses.
3. **Calendar Booking (Accept Proposal)**
   1. User clicks "Accept" on proposed block in Calendar Assist.
   2. Frontend calls API `/schedule/accept` with block id and adjustments.
   3. Backend validates conflicts against cached events; if clear, creates Google Calendar event.
   4. Backend updates `suggested_blocks` (accepted + event id) and logs to `audit_events`.
   5. Frontend refreshes calendar view; worker schedules reminder/notification as needed.

## Normalized Database Schema (MVP)

*Conventions*: All tables use `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `created_at TIMESTAMPTZ DEFAULT now()`, `updated_at TIMESTAMPTZ DEFAULT now()` with triggers, and `NOT NULL` unless noted. Sources: **U** user-input, **A** AI-generated, **S** system-generated.

### Relational Tables

| Table | Field | Type | Constraints / Indexes | Relationships | Source |
| --- | --- | --- | --- | --- | --- |
| users | email | CITEXT | UNIQUE index `users_email_uq` | — | U |
|  | name | TEXT |  | — | U |
|  | auth_provider | TEXT | CHECK in (`google`) | — | S |
| credentials | user_id | UUID | FK → users(id), index `cred_user_idx` | belongs to user | S |
|  | provider | TEXT | CHECK in (`google`) | — | S |
|  | access_token | BYTEA (encrypted) |  | — | S |
|  | refresh_token | BYTEA (encrypted) |  | — | S |
|  | scopes | TEXT[] |  | — | S |
|  | expires_at | TIMESTAMPTZ | index `cred_expires_idx` | — | S |
| projects | user_id | UUID | FK → users(id), index `projects_user_idx` | owner | U |
|  | title | TEXT |  | — | U |
|  | goal | TEXT |  | — | U |
|  | audience | TEXT |  | — | U |
|  | constraints | TEXT |  | — | U |
|  | timeframe | DATERANGE |  | — | U |
|  | status | TEXT | CHECK in (`draft`,`active`,`paused`,`done`) | — | S |
| milestones | project_id | UUID | FK → projects(id), index `milestones_project_idx` | belongs to project | U |
|  | title | TEXT |  | — | U |
|  | target_date | DATE |  | — | U |
|  | status | TEXT | CHECK in (`planned`,`in_progress`,`done`) | — | S |
|  | progress_pct | SMALLINT | CHECK between 0–100 | — | S |
| tasks | project_id | UUID | FK → projects(id), index `tasks_project_idx` | belongs to project | U/A |
|  | milestone_id | UUID | FK → milestones(id) NULLABLE | optional parent | U/A |
|  | title | TEXT | index `tasks_title_trgm` (GIN trigram) | — | U/A |
|  | description | TEXT |  | — | U/A |
|  | status | TEXT | CHECK in (`backlog`,`planned`,`in_progress`,`done`,`snoozed`) | — | S |
|  | priority_score | NUMERIC(6,2) | index `tasks_priority_idx` | — | A/S |
|  | impact | SMALLINT | CHECK 1–5 | — | U/A |
|  | effort | SMALLINT | CHECK 1–5 | — | U/A |
|  | urgency | SMALLINT | CHECK 1–5 | — | U/A |
|  | runway_factor | SMALLINT | CHECK 1–5 | — | A |
|  | estimate_minutes | INTEGER |  | — | U/A |
|  | tags | TEXT[] | GIN index `tasks_tags_idx` | — | U/A |
|  | source | TEXT | CHECK in (`user`,`ai`,`signal`) | — | S |
|  | rationale | JSONB | stores scoring explanation; index `tasks_rationale_idx` (GIN) | — | A |
| suggested_blocks | task_id | UUID | FK → tasks(id), index `blocks_task_idx` | belongs to task | A/S |
|  | user_id | UUID | FK → users(id), index `blocks_user_idx` | — | S |
|  | start_at | TIMESTAMPTZ | btree index `blocks_time_idx` | — | A/S |
|  | end_at | TIMESTAMPTZ |  | — | A/S |
|  | confidence | NUMERIC(3,2) |  | — | A |
|  | status | TEXT | CHECK in (`proposed`,`accepted`,`declined`,`expired`) | — | S/U |
|  | rationale | JSONB | reason for slot; GIN index `blocks_rationale_idx` | — | A |
|  | calendar_event_id | TEXT | nullable | links to Google event | S |
| time_logs | task_id | UUID | FK → tasks(id), index `time_logs_task_idx` | belongs to task | U |
|  | user_id | UUID | FK → users(id) | — | U |
|  | duration_minutes | INTEGER | CHECK >0 | — | U |
|  | date | DATE | index `time_logs_date_idx` | — | U |
|  | note | TEXT | nullable | — | U |
| signals | user_id | UUID | FK → users(id) | owner | S/A |
|  | project_id | UUID | FK → projects(id) NULLABLE | optional | S/A |
|  | source | TEXT |  | — | S |
|  | title | TEXT | index `signals_title_trgm` (GIN) | — | S/A |
|  | url | TEXT | UNIQUE partial index on non-null | — | S |
|  | sector | TEXT | index `signals_sector_idx` | — | U/A |
|  | relevance_score | NUMERIC(3,2) |  | — | A |
|  | confidence | NUMERIC(3,2) |  | — | A |
|  | summary | TEXT |  | — | A |
|  | note | TEXT | nullable | — | U |
| notifications | user_id | UUID | FK → users(id), index `notif_user_idx` | recipient | S |
|  | type | TEXT | CHECK in (`daily_plan`,`reminder`,`signal`) | — | S |
|  | payload | JSONB |  | — | S |
|  | status | TEXT | CHECK in (`pending`,`sent`,`failed`) | — | S |
|  | scheduled_at | TIMESTAMPTZ | index `notif_sched_idx` | — | S |
|  | sent_at | TIMESTAMPTZ |  | — | S |
| audit_events | user_id | UUID | FK → users(id), index `audit_user_idx` | actor | S |
|  | entity_type | TEXT |  | — | S |
|  | entity_id | UUID |  | — | S |
|  | action | TEXT |  | — | S |
|  | metadata | JSONB |  | — | S |

### Vector / LLM Support Tables

- **embeddings**: `id UUID PK`, `user_id UUID FK → users`, `project_id UUID FK → projects NULLABLE`, `record_type TEXT CHECK in (task,project,signal)`, `record_id UUID`, `content TEXT` (U/A), `metadata JSONB` (S), `vector VECTOR` (OpenAI 1536 dim) with HNSW index; unique composite index on (`record_type`,`record_id`). Source: mixed U/A with S write.
- **ai_prompts** (optional audit): `id UUID`, `user_id`, `purpose TEXT`, `prompt JSONB`, `response JSONB`, `model TEXT`, `latency_ms INTEGER`, `tokens_input INTEGER`, `tokens_output INTEGER`, timestamps. Source: S/A.

### JSON Schemas

**Task rationale (stored in `tasks.rationale`)**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "TaskPriorityRationale",
  "type": "object",
  "properties": {
    "impact_reason": { "type": "string" },
    "effort_reason": { "type": "string" },
    "urgency_reason": { "type": "string" },
    "runway_reason": { "type": "string" },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 }
  },
  "required": ["impact_reason", "effort_reason", "urgency_reason", "confidence"]
}
```

**Suggested block rationale (`suggested_blocks.rationale`)**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ScheduleProposal",
  "type": "object",
  "properties": {
    "task_title": { "type": "string" },
    "preferred_window": { "type": "string" },
    "constraints": { "type": "array", "items": { "type": "string" } },
    "conflicts": { "type": "array", "items": { "type": "string" } },
    "score": { "type": "number" }
  },
  "required": ["task_title", "score"]
}
```

**Embedding payload (`embeddings.content` + `metadata`)**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "EmbeddingRecord",
  "type": "object",
  "properties": {
    "record_type": { "type": "string", "enum": ["task", "project", "signal"] },
    "record_id": { "type": "string", "format": "uuid" },
    "user_id": { "type": "string", "format": "uuid" },
    "project_id": { "type": "string", "format": "uuid", "nullable": true },
    "text": { "type": "string" },
    "sector": { "type": "string" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "source": { "type": "string", "enum": ["user", "ai", "signal"] }
  },
  "required": ["record_type", "record_id", "user_id", "text"]
}
```


## Daily Plan Engine — Prompt, Logic, and Outputs

### Prompt Template (LLM-facing)
```
System: You are the FounderOps Daily Plan engine. Produce a feasible workday plan with rationale that respects user constraints and calendar availability. Always output valid JSON matching the provided schema.

Context:
- User profile: {user_profile_json}
- Working hours (local time): {working_hours}
- Focus windows: {focus_windows}
- Today date: {today_date}
- Yesterday summary: {yesterday_summary} // includes completed, incomplete, slipped reasons, logged durations
- Upcoming events (read-only): {calendar_events_json}
- Backlog tasks (with priority breakdown): {task_list_json}
- Market signals (relevance + confidence): {market_signals_json}
- Business horizon/runway: {runway_context}

Instructions:
1) Analyze yesterday’s progress to adjust confidence/estimates and mark any slip reasons.
2) Re-score tasks using impact, urgency, runway alignment, and market-signal multipliers (only apply to related tasks with confidence ≥ {signal_confidence_threshold}).
3) Select tasks for today that fit available focus blocks; prefer fewer, higher-impact tasks.
4) Propose schedule blocks within working hours, respecting buffers ({buffer_minutes}) and avoiding conflicts with fixed events.
5) Note assumptions or missing data in the `alerts` array.
6) Return JSON only; do not include explanations outside JSON.
```

### Scheduling Algorithm (worker service)
1. **Inputs**: user_id, date (today), working_hours, focus_windows, calendar events, backlog (status=backlog/planned), time estimates, priority scores, market signals, max_daily_hours.
2. **Normalize time**: convert all times to user timezone; clip schedule to working_hours; generate available windows excluding confirmed events and required buffers before/after meetings.
3. **Adjust priorities**:
   - Recompute `priority_score = f(impact, urgency, runway_factor, effort) * (1 + signal_multiplier)` where signal_multiplier is applied when a market signal matches task sector/tags and confidence ≥ threshold.
   - Boost tasks blocked yesterday or marked with slip reason; decay tasks snoozed >2 times.
4. **Select tasks**:
   - Sort by priority_score desc, then by blocked/slipped status, then shortest estimate.
   - Fill day with tasks until total estimated minutes approaches `max_daily_hours * 60` minus buffers.
   - Prefer 1–3 deep-work blocks (60–120 min) for top tasks; bucket small tasks into a single admin block if needed.
5. **Place blocks**:
   - Use focus_windows first; otherwise earliest available window.
   - Ensure minimum block = 30 min; split tasks >120 min into multiple blocks with 10–15 min buffer.
   - If conflicts appear after placement (new events), mark affected blocks as `needs_reschedule` and enqueue recompute.
6. **Output**: structured plan JSON stored in `suggested_blocks` and `notifications.payload`; attach rationale per block.
7. **Re-run triggers**: morning cron (default 6–7am user time), manual refresh, webhook on new calendar event within the day, or when market signals with high confidence arrive.

### JSON Output Structure (LLM and API contract)
```json
{
  "date": "2025-03-01",
  "timezone": "America/Los_Angeles",
  "alerts": ["string describing missing data or conflicts"],
  "priority_summary": {
    "top_factors": ["impact", "urgency", "runway", "market_signal"],
    "signals_applied": [
      {
        "task_id": "uuid",
        "signal_id": "uuid",
        "confidence": 0.82,
        "reason": "signal about competitor launch increases urgency"
      }
    ]
  },
  "tasks": [
    {
      "task_id": "uuid",
      "title": "string",
      "status": "planned|backlog|slipped",
      "estimate_minutes": 90,
      "priority_score": 0.87,
      "rationale": {
        "impact_reason": "...",
        "urgency_reason": "...",
        "runway_reason": "...",
        "signal_reason": "...",
        "confidence": 0.7
      }
    }
  ],
  "schedule": [
    {
      "block_id": "uuid",
      "task_id": "uuid",
      "start_at": "2025-03-01T09:00:00-08:00",
      "end_at": "2025-03-01T10:30:00-08:00",
      "calendar_id": "primary",
      "location": "online",
      "status": "proposed|accepted|needs_reschedule|declined",
      "buffer_minutes_before": 10,
      "buffer_minutes_after": 10,
      "conflicts": ["meeting 10:30 standup"],
      "confidence": 0.76,
      "rationale": {
        "placement_reason": "uses focus window 9-11am",
        "conflict_check": "no overlaps",
        "assumptions": ["user prefers mornings for deep work"]
      }
    }
  ]
}
```

### Edge-Case Handling
- **New meetings appear**: webhook triggers recompute; mark overlapping blocks as `needs_reschedule`, notify user, and propose nearest alternate slot within working hours.
- **Task overflow (too many high-priority items)**: cap to max_daily_hours; push overflow to backlog with `snoozed` status and include note in `alerts`.
- **Missing estimates**: assign default 60 min with low confidence; highlight in `alerts` for user confirmation.
- **No focus windows available**: fall back to shortest gaps; if still impossible, propose next-day carryover and explain in `alerts`.
- **Low market signal confidence**: do not adjust priority; include ignored signals for transparency.
- **Declined blocks**: decrement task priority slightly and attempt alternative placement later in the day if capacity remains.
- **Multi-day tasks**: split into multiple blocks across days with dependencies tracked via `tasks.status = planned` and `suggested_blocks.status = proposed`.

## Task → Time-Block Scheduling (Pomodoro-first)

### Constraints
- **Hard constraints**: working hours, fixed calendar events, task deadlines, minimum block length, required buffers, and user-declared focus windows (when provided). Violations are not allowed.
- **Soft constraints**: preferred time-of-day for deep work, context-switch limits (max N different tasks/day), preferred pomodoro cadence (e.g., 50/10 vs 25/5), and proximity-to-deadline nudges. These can be relaxed when capacity is tight.

### Algorithm Goals
1) Decompose tasks into **pomodoro-friendly focus blocks** that respect hard constraints first.
2) Auto-reschedule when conflicts appear while keeping deadline feasibility.
3) Minimize context switches and avoid overscheduling by capping daily load.

### Pseudocode
```
INPUT: tasks (with estimate, priority_score, deadline, type), working_hours, focus_windows, calendar_events, pomodoro_prefs, hard_constraints, soft_constraints, max_daily_minutes

normalize_time()
available = derive_free_windows(working_hours, calendar_events, hard_constraints.buffers)
ordered_tasks = sort_by(priority_score desc, deadline asc, slipped_flag desc, estimate asc)

for task in ordered_tasks:
    remaining = task.estimate_minutes
    block_size = choose_pomodoro_block(pomodoro_prefs, remaining)
    while remaining > 0 and available not empty:
        window = select_best_window(available, focus_windows, soft_constraints.preferred_time, block_size)
        if !fits(window, block_size, hard_constraints):
            available = shift_or_split(window)
            continue
        place_block(task_id=task.id,
                    start=window.start,
                    end=window.start + block_size,
                    buffer_before=hard_constraints.buffer_before,
                    buffer_after=hard_constraints.buffer_after,
                    status="proposed")
        remaining -= block_size
        shrink_window(available, window, block_size, buffers)
    if remaining > 0:
        mark(task, status="carryover", reason="insufficient windows")

if total_scheduled_minutes > max_daily_minutes:
    trim_lowest_priority_blocks()

postprocess_conflicts():
    detect new events; mark overlaps as needs_reschedule; requeue algorithm with updated availability.

OUTPUT: list of proposed blocks with rationale + constraints applied
```

### Flowcharts (text)
**Block Placement Loop**
- Start → Load tasks & availability → Sort tasks → For each task:
  - Split into pomodoro-sized chunks → Find best window respecting hard constraints → [Fits?]
    - Yes → Place block (+buffers) → Update availability → [Remaining work?]
      - Yes → Repeat search in updated availability
      - No → Move to next task
    - No → Try next window or split window
  - After tasks → Cap by daily minutes → Emit proposed schedule.

**Rescheduling Trigger**
- Event/webhook arrives → Identify overlapping blocks → Mark `needs_reschedule` → Recompute availability → Re-run placement loop for affected tasks → Notify user with deltas.

### Handling Deadlines & Overflow
- Tasks with deadlines inside the planning horizon get **urgency boosts**; block placement prefers earlier windows to create slack.
- If remaining time before deadline is less than required work, split across nearest days and surface `at-risk` alert.
- On overflow, convert lowest-priority blocks to backlog/carryover and note rationale in `alerts` for transparency.

## MVP REST API Specification (Postman-Ready)

### Overview
- **Base URL**: `https://api.founderops.example.com/v1`
- **Auth**: `Authorization: Bearer <JWT>` issued after OAuth sign-in. Refresh via `/auth/refresh`.
- **Content-Type**: `application/json; charset=utf-8`
- **Pagination**: `?page=<int>&page_size=<int>` (default 20, max 100)
- **Rate Limits**: 120 requests/min per user; 20 requests/min on scheduling endpoints. Responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`.
- **Errors**: Standard JSON `{ "error": { "code": "string", "message": "string", "details": object } }`
- **Idempotency**: Mutating endpoints accept optional `Idempotency-Key` header.

### Authentication & Session
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| POST | `/auth/login/google` | Exchange Google OAuth code for JWT + refresh token. | Body: `{ "code": "oauth_code", "redirect_uri": "https://app.founderops..." }` | 200 `{ "access_token": "...", "refresh_token": "...", "expires_in": 3600, "user": {"id":"uuid","email":"..."} }` |
| POST | `/auth/refresh` | Rotate access token. | Body: `{ "refresh_token": "..." }` | 200 `{ "access_token": "...", "expires_in": 3600 }` |
| POST | `/auth/logout` | Revoke tokens. | Header only | 204 No Content |

### Users & Settings
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| GET | `/me` | Current user profile & settings. | — | 200 `{ "id":"uuid","email":"...","name":"...","working_hours":{...},"focus_windows":[...],"notification_prefs":{...} }` |
| PATCH | `/me` | Update profile/settings. | Body (partial): `{ "name": "...", "working_hours": {...}, "focus_windows": [...], "notification_prefs": {...} }` | 200 profile JSON |
| POST | `/me/calendar/connect` | Start Google OAuth (returns URL or PKCE params). | Body: `{ "redirect_uri": "..." }` | 200 `{ "auth_url": "..." }` |
| POST | `/me/calendar/complete` | Finish OAuth with code. | Body: `{ "code": "...", "redirect_uri": "..." }` | 200 `{ "status": "connected", "scopes": ["https://www.googleapis.com/auth/calendar.readonly"] }` |

### Projects & Milestones
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| POST | `/projects` | Create project (via intake or manual). | Body: `{ "title": "...", "goal": "...", "audience": "...", "constraints": "...", "timeframe": {"start":"2025-03-01","end":"2025-05-01"} }` | 201 project |
| GET | `/projects` | List user projects. | Query: `status`, pagination | 200 `{ "data": [project...], "page":1, "page_size":20 }` |
| GET | `/projects/{project_id}` | Fetch project detail incl. milestones summary. | Path param | 200 project JSON |
| PATCH | `/projects/{project_id}` | Update project. | Body (partial): project fields | 200 updated project |
| POST | `/projects/{project_id}/milestones` | Add milestone. | Body: `{ "title":"...","target_date":"2025-03-20" }` | 201 milestone |
| PATCH | `/milestones/{milestone_id}` | Update milestone status/progress. | Body: `{ "status":"in_progress","progress_pct":50 }` | 200 milestone |

### Tasks / Backlog
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| POST | `/projects/{project_id}/tasks` | Create task (user or AI). | Body: `{ "title":"...","description":"...","estimate_minutes":90,"tags":["research"],"source":"user" }` | 201 task |
| GET | `/projects/{project_id}/tasks` | List tasks with filters. | Query: `status`, `tag`, `milestone_id`, `sort`, pagination | 200 `{ "data": [task...], "page":1 }` |
| GET | `/tasks/{task_id}` | Fetch task detail with priority breakdown. | — | 200 task |
| PATCH | `/tasks/{task_id}` | Update task fields/status. | Body (partial): `{ "status":"planned","estimate_minutes":60,"priority_score":0.78 }` | 200 task |
| POST | `/tasks/{task_id}/split` | Decompose task into sub-tasks/blocks. | Body: `{ "parts": [{"title":"...","estimate_minutes":45}] }` | 201 `{ "children": [task...] }` |

### Guided Intake & AI Breakdown
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| POST | `/intake` | Submit idea + context; returns project skeleton & initial tasks. | Body: `{ "idea":"...","goal":"...","audience":"...","constraints":"...","timeframe":{"start":"...","end":"..."} }` | 201 `{ "project": {...}, "tasks": [ ... ], "rationale": {...} }` |
| POST | `/intake/{project_id}/rerun` | Regenerate tasks for an existing project. | Body: optional overrides | 200 `{ "tasks": [...], "diff": {...} }` |

### Priority & Daily Plan
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| POST | `/priority/recalculate` | Re-score tasks. | Body: `{ "project_id":"uuid" }` optional | 202 `{ "job_id":"uuid" }` |
| GET | `/priority/jobs/{job_id}` | Job status/result. | — | 200 `{ "status":"completed","tasks":[...]} ` |
| POST | `/plan/daily` | Generate today’s plan & schedule proposals. | Body: `{ "date":"2025-03-01","project_id":"uuid" }` | 201 plan JSON (matches Daily Plan schema) |
| GET | `/plan/daily/{date}` | Fetch latest plan for date. | Path param | 200 plan JSON |

### Calendar Assist & Scheduling
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| GET | `/calendar/events` | Read cached events within window. | Query: `start`, `end` ISO | 200 `{ "events": [ {"id":"...","title":"...","start_at":"...","end_at":"..."} ] }` |
| GET | `/schedule/proposals` | List proposed blocks. | Query: `status` | 200 `{ "data": [proposal...]} ` |
| POST | `/schedule/proposals` | Create proposals (manual override). | Body: `{ "task_id":"uuid","start_at":"...","end_at":"...","calendar_id":"primary" }` | 201 proposal |
| POST | `/schedule/accept` | Accept proposed block(s) and write to calendar. | Body: `{ "proposal_ids":["uuid"], "calendar_id":"primary" }` | 200 `{ "events": [ {"proposal_id":"uuid","calendar_event_id":"..."} ] }` |
| POST | `/schedule/decline` | Decline proposal(s). | Body: `{ "proposal_ids":["uuid"], "reason":"conflict" }` | 200 `{ "status":"declined" }` |
| POST | `/schedule/reschedule` | Request alternate slots. | Body: `{ "proposal_id":"uuid", "constraints": {"after":"2025-03-01T13:00Z"} }` | 202 `{ "job_id":"uuid" }` |

### Time Tracking & Reports
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| POST | `/tasks/{task_id}/time_logs` | Add manual time log. | Body: `{ "duration_minutes":45,"date":"2025-03-01","note":"..." }` | 201 time log |
| GET | `/tasks/{task_id}/time_logs` | List logs for a task. | Query: pagination | 200 `{ "data": [time_log...] }` |
| GET | `/reports/adherence` | Weekly adherence summary. | Query: `start`, `end` | 200 `{ "planned_minutes":480,"logged_minutes":420,"completion_rate":0.78,"slip_reasons":[...] }` |

### Signals (Read-Only in MVP)
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| GET | `/signals` | List curated signals. | Query: `project_id`, `sector` | 200 `{ "data": [signal...]} ` |
| POST | `/signals/{signal_id}/notes` | Add personal note/task link. | Body: `{ "note":"...","task_id":"uuid" }` | 201 `{ "note":"..." }` |

### Notifications
| Method | Path | Purpose | Request | Success Response |
| --- | --- | --- | --- | --- |
| GET | `/notifications` | List pending/sent notifications. | Query: `status` | 200 `{ "data": [notification...] }` |
| POST | `/notifications/{id}/ack` | Acknowledge notification. | — | 200 `{ "status":"acknowledged" }` |

### Error Codes (examples)
- `400_invalid_request`: validation failed (details included)
- `401_unauthorized`: missing/invalid token
- `403_forbidden`: lacking permissions (e.g., calendar write not granted)
- `404_not_found`: resource missing or not owned by user
- `409_conflict`: calendar overlap or stale proposal
- `429_rate_limited`: exceeded quota (honor `Retry-After`)
- `500_internal_error`: unexpected server error

### Postman Collection Hints
- Set collection-level variables: `base_url`, `access_token`, `refresh_token`, `calendar_id`.
- Pre-request script to inject `Authorization` header from `access_token` and handle 401 by calling `/auth/refresh`.
- Use `tests` tab to assert `status < 300` and parse `X-RateLimit-Remaining` for monitoring.

## MVP Launch Sequence Playbook (Step-by-Step)

**Positioning anchor**
- Headline: "FounderOps Assistant — Strategy-aware autoplan that turns your next idea into today’s calendar-ready work."
- Subhead: "Get a daily plan you can trust, fed by your goals, working hours, and live market signals."
- Proof points: transparent priority math, confirm-first scheduling, and first-plan-in-15-minutes onboarding.

**Step 1: Waitlist funnel copy (week -4 to -3)**
- Landing hero: "From idea to a scheduled workday in minutes." CTA: "Join the early access list" (email + sector + goal).
- Social proof placeholders: "Built with founders from YC/SaaS/Fintech" (swap with real logos as earned); trust copy on data scopes.
- Value bullets: "Turns ideas into a 1-week plan", "Suggests focus blocks, you confirm", "Adapts to your working hours".
- Post-submit screen: "You’re in. Watch for your onboarding slot — we batch invites weekly." Secondary CTA to share on Twitter/LinkedIn with prefilled text.
- Confirmation email: recap positioning, 45-second Loom of daily plan flow, and a 3-question intake link (idea, working hours, sector).

**Step 2: Beta onboarding plan (week -2 to 0)**
- Batch invites weekly (25 users) to control load; require calendar read-only + one project idea before scheduling a session.
- 20-minute guided onboarding (cal + idea intake + first daily plan) via Zoom; record friction and time-to-first-plan.
- Provide a "Day 1 checklist": connect calendar, add one goal, accept ≥1 suggested block, log a session note.
- Support: Slack/Discord beta room + 24h response SLA; in-app "Need help?" link to playbook and office hours.
- Exit criteria to stay in beta: complete 3 plans in first week or provide structured feedback via form.

**Step 3: First 100 users strategy (weeks 1–4)**
- Channels: accelerator cohorts (offer office hours + cohort metrics), founder communities (Indie Hackers/Slack groups), and maker Twitter/LinkedIn threads showing "idea → calendar" demos.
- Offers: "Concierge planning for your next sprint" and "Founding team pack" (2 seats) limited to first 50.
- Referral loop: after 3 accepted plans, prompt users with "Invite 2 founder friends" and skip-the-line codes.
- Content: 90-second Looms of daily plan + rationale, 1-page case studies ("from idea to 7 tasks scheduled"), and a teardown comparing against a generic todo tool.
- Capture: every signup tagged with source (UTM) and project type to measure channel quality.

**Step 4: Metrics to track weekly (and target ranges)**
- Top-of-funnel: waitlist signups, invite acceptance rate (goal ≥40%), channel conversion by source.
- Activation: calendar connects + first project created within 24h (goal ≥60% of invites), time-to-first plan (<15 min median).
- Engagement: weekly active planners (opened plan ≥3 days), plan adherence (% scheduled blocks executed, goal 60–70%).
- Value perception: plan usefulness CSAT (goal 4.3/5+), relevance of suggestions (goal 4.0/5+), churn reasons.
- Growth loop: referral conversion (% of prompted users who invite, goal 15%) and beta-to-paid intent (soft commit) after week 2.

**Step 5: Feedback and iteration loop (weekly sprint)**
- Run a weekly debrief using onboarding recordings and slip reasons; prioritize fixes that reduce time-to-first-plan and increase accepted blocks.
- Publish a changelog to beta users every Friday with "what changed" and "what’s next"; ask one focused question per release.
- Rotate experiments: (a) alternate headline variants, (b) test shorter onboarding vs. guided, (c) compare 25- vs. 50-minute deep-work block presets.

## 12-Month Roadmap (Dependencies & Risks)

### Phases and Timelines
| Phase | Timeline | Objectives | Dependencies | Risks/Notes |
| --- | --- | --- | --- | --- |
| **MVP** | Months 0–3 | Guided intake → project skeleton; priority engine v1; confirm-to-schedule daily plan; Google Calendar read + suggested blocks; manual time logs; daily digest; single-user only. | Google OAuth scopes; basic LLM access; calendar webhook infra; React/Next.js shell; Postgres schema + Qdrant base collections. | Risk: calendar/auth edge cases could slow onboarding → mitigate with manual fallback and clear error states. |
| **V1** | Months 3–6 | Add auto time detection (opt-in); weekly review + adherence insights; curated market signals with confidence scores; backlog grooming (split/merge tasks); Slack/Email digests; template starter packs. | Stable MVP telemetry; instrumentation on plan adherence; signals ingestion pipeline; worker queue reliability; pricing/billing stub for pilot. | Risk: signal quality noise → start with curated feeds + human QA; time detection accuracy → keep manual override prominent. |
| **V1.5** | Months 6–9 | Team mode (roles, shared projects); shared objectives/OKRs; improved scheduling (soft constraints, preferred cadence); auto-reschedule on meeting conflicts; investor update draft from milestones. | Authz model (RBAC); calendar write scopes; notification scaling; doc/export service for updates; improved scoring service. | Risk: trust/regression from auto-reschedule → ship confirm-first toggle + changelog; collaboration increases privacy needs → audit trails mandatory. |
| **V2** | Months 9–12 | Integrations with issue trackers (Linear/GitHub) for task sync; experiment library; funding tracker; advanced analytics (velocity by initiative, slip reasons trend); market-signal-driven reprioritization. | Stable webhook sync patterns; embedding store tuned for cross-source retrieval; experiment schema; analytics warehouse or read-replica; integration partners. | Risk: integration latency/drift → implement reconciliation jobs; market-driven reprioritization must expose rationale and allow opt-out. |
| **Stretch (parallel/backlog)** | Months 9–12+ | Mobile companion (plan review + confirmations); AI copilot chat for backlog grooming; offline/low-connectivity mode; SOC2 readiness; extensible plugin webhooks. | Mobile framework choice; security budget; plugin sandboxing; audit/compliance tooling. | Risk: scope creep; compliance timelines → timebox discovery and gate behind pilot/beta flags. |

### Milestone Details & Dependencies
- **MVP**: Finish calendar read + block proposal pipeline before onboarding; prioritize reliability and fast recovery paths. Launch with manual overrides for all AI actions. Dependency on Qdrant/Postgres baseline and minimal billing gates (if any) to avoid blocking onboarding.
- **V1**: Ship signals ingestion and scoring after telemetry shows plan adherence baseline; dependency on worker queues and rate-limited news APIs. Introduce weekly review once time-log data is consistently captured. Pricing experiments can begin with usage caps.
- **V1.5**: Requires RBAC and audit events before team mode; calendar write scope expansion after user trust is validated in V1. Auto-reschedule depends on stable webhook handling and conflict detection. Investor updates depend on milestone completeness and time-log data quality.
- **V2**: Integrations depend on mapping tasks/issues and conflict resolution rules; experiment library ties into priority engine and scheduling; market-driven reprioritization must expose “why” and require confirm/opt-out. Funding tracker relies on secure storage for investor data and permission controls.
- **Stretch**: Mobile and plugin ecosystems should follow security/compliance groundwork; SOC2 prep depends on logging, backups, and change management maturity.

### Risk Management Notes
- **Trust & control**: Maintain confirm-first defaults through V1.5; only enable auto-writes/reschedule with explicit user toggles and changelog visibility.
- **Signal quality**: Start with curated feeds and human-reviewed mappings; gradually increase automation as precision/recall metrics improve.
- **Performance & cost**: Use smaller models for ranking/rationale where acceptable; cache embeddings and plan outputs; budget guardrails per user.
- **Integration fragility**: Implement reconciliation jobs and status dashboards; fail safe by pausing sync rather than deleting user data.
- **Compliance**: Begin audit logging and data retention policies in MVP to avoid rework; schedule SOC2 readiness assessment in V2 planning.
