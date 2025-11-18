# FounderOps Assistant — MVP Test Plan & QA Checklist

## Scope & Assumptions
- Covers 4–6 week MVP: guided idea intake, project dashboard, priority scoring, daily plan proposal, confirm-to-schedule Google Calendar sync, manual time logging, and project/task CRUD.
- Single-user mode; Google Calendar is the only external integration.
- Tests assume seeded sample data plus ability to create/delete test projects without affecting production data.

## Functional Tests
- Project creation/edit/delete with validation (required fields, max lengths, statuses).
- Idea intake → AI breakdown populates project, milestones, and tasks with rationale and priority scores.
- Task CRUD: priority fields (impact/effort/urgency), status transitions, due dates, tags.
- Priority engine recomputes scores when fields change (impact, effort, urgency, dependencies, market multiplier).
- Daily plan generation: produces tasks, rationale, and proposed blocks without calendar writes until user confirmation.
- Manual time logging: start/stop timer, manual entry, edit/delete logs; totals roll up to tasks and projects.
- Notifications: surface “plan ready,” “block conflict,” and “task overdue” in-app banners/toasts.
- Settings: working hours, focus windows, pomodoro preferences, calendar permissions (read vs. write), default buffer times.

## Integration Tests
- Google OAuth consent: scopes limited to calendar.readonly unless user enables writes; token refresh and revocation flows.
- Calendar availability fetch: reads events in user-defined hours; respects time zone; handles all-day events.
- Calendar write on confirm: creates events with summaries, descriptions (task IDs + rationale), and reminders; updates and deletes on reschedule.
- AI breakdown endpoint: validates payloads, enforces rate limits, returns structured JSON with stable keys.
- Persistence: project/task/time log creation flows in DB transactions; optimistic UI updates reconcile with server responses.
- Frontend data fetching: SWR/React Query cache invalidation on mutations; error states with retries/backoff.

## AI Validation Tests
- Deterministic JSON contract: AI responses validate against schema (project, milestone, task fields; rationale strings; numeric priority).
- Guardrails: redaction of PII in prompts; max token limits; refusal handling for unsupported content.
- Quality checks: minimum diversity of task categories (research/build/ops), no duplicate tasks, balanced effort estimates.
- Relevance: market-signal adjustments only applied when sector matches project; explain rationale.
- Regression set: fixed seed ideas and expected output snapshots for diffing across model versions.

## Calendar Sync Tests
- Initial sync: imports existing events and shows them in availability grid; excludes declined/cancelled events.
- Conflict detection: blocks do not overlap confirmed meetings; warns on tentative events.
- Rescheduling: when a meeting is added/changed, blocks are shifted within same day respecting buffers; if impossible, they are deferred with user prompt.
- Focus protection: do not place blocks outside working hours or during focus windows; apply user-defined buffers before/after meetings.
- Pomodoro structure: long tasks split into 25/5 or 50/10 cycles with labels; contiguous sessions limited by user cap.
- Cancellation: deleting a task removes associated calendar events; orphaned events are flagged for cleanup.

## Edge-Case Scenarios
- No availability today: propose backlog grooming or preparation tasks; keep calendar clean.
- Past-due tasks with today-only availability: prioritize by urgency and effort; limit to achievable subset.
- Rapid back-to-back meetings: enforce buffers; defer blocks rather than squeezing partial pomodoros.
- Offline/LLM failure: surface fallback template tasks; do not write to calendar; log incident.
- OAuth token expired/revoked: prompt re-auth; gracefully degrade to read-only; block writes until resolved.
- Timezone changes: recalc availability and block times after tz update; prevent duplicate events.
- Large backlog import: pagination and batch scoring without timeouts; show progress indicator.

## QA Checklist
- ✅ Schema validation is enforced for AI responses and API payloads (backend + client).
- ✅ All API endpoints covered by happy-path and error-path tests; meaningful error messages surfaced to UI.
- ✅ Accessibility: keyboard navigation for dashboard and dialogs; ARIA labels on inputs and buttons; color contrast meets WCAG AA.
- ✅ Performance: dashboard and daily plan load <2s on broadband with seeded data; cache headers set for static assets.
- ✅ Observability: structured logs with correlation IDs; key metrics emitted (plan generation latency, schedule success rate, failure reasons).
- ✅ Security: OAuth scopes minimal; secrets not logged; HTTPS enforced; rate limits applied to AI and scheduling endpoints.
- ✅ Rollback: calendar writes include idempotency keys; retries are safe; changelog visible to user after reschedule.

## Gherkin Test Scripts

### Functional
**Scenario: Create project via idea intake**
- Given a signed-in user with no projects
- When they submit an idea through the intake form with goal, audience, and constraints
- Then the system calls the AI breakdown endpoint and creates a project with at least 1 milestone and 3 tasks tagged to that project
- And displays the project dashboard with the new project selected

**Scenario: Edit task priority recalculates score**
- Given an existing task with impact 2, effort 2, urgency 1
- When the user updates impact to 4
- Then the priority engine recalculates the score using the new impact and persists it
- And the task list shows the updated score without a page reload

**Scenario: Daily plan proposes blocks without writes**
- Given the user has tasks and a connected calendar with write permissions disabled
- When they generate today’s plan
- Then the plan shows proposed blocks with durations and rationales
- And no calendar events are created until the user explicitly confirms scheduling

### Integration
**Scenario: Calendar write after confirmation**
- Given the user has enabled calendar write and has free time from 10:00–12:00
- When they confirm the daily plan containing a 60-minute block
- Then a calendar event is created in that window with task ID in the description and a reminder
- And the event ID is stored on the corresponding task for future updates

**Scenario: OAuth token expiration**
- Given the stored Google token is expired
- When the app attempts to fetch availability
- Then the request fails gracefully, the user is prompted to re-authenticate, and no writes are attempted

### AI Validation
**Scenario: AI returns invalid JSON**
- Given the AI breakdown endpoint is invoked with a valid idea
- When the LLM returns malformed JSON
- Then the service rejects the response, retries once with a constrained prompt, and returns a 502 with a user-friendly error if still invalid

**Scenario: Market signal applied to wrong sector**
- Given a project tagged as “healthcare”
- When a fintech news item arrives
- Then the priority engine does not adjust task scores and logs the discard decision

### Calendar Sync & Scheduling
**Scenario: Meeting added after plan generation**
- Given a daily plan has scheduled two blocks from 9:00–11:00
- When a new meeting is added at 9:30–10:00
- Then the system reschedules the affected block later the same day respecting buffers
- And notifies the user of the change in-app

**Scenario: No availability today**
- Given the user has meetings covering all working hours
- When they generate a daily plan
- Then the system proposes non-calendar tasks (planning, backlog grooming) and offers to shift work to the next available day

### Edge Cases
**Scenario: Timezone change mid-week**
- Given the user updates their timezone from PST to EST
- When the next daily plan is generated
- Then existing scheduled blocks are re-evaluated to avoid duplicates, and all new blocks use the updated timezone

**Scenario: Large backlog import**
- Given the user imports 500 tasks
- When scoring completes
- Then the UI paginates results, shows a progress indicator during processing, and does not time out the request
