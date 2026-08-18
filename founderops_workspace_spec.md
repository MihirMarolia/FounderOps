# FounderOps workplace specification

## Product promise
FounderOps is a guided operating system for first-time founders. It converts a founder's context, choices, and spoken or typed answers into a staged plan of evidence-building work.

## Primary navigation

- **Today:** one focus, next actions, overdue items, and current experiment.
- **Build path:** the sequential startup framework with stage completion and evidence status.
- **Workspace:** editable artifacts including the problem brief, ICP, value proposition, experiment log, interview log, MVP scope, business model, metrics, and decision log.
- **Evidence:** interviews, experiments, customer signals, metrics, and learnings.
- **Settings/context:** industry, segment, audience, location, business model, founder goal, stage, and weekly capacity.

## Core interaction model

Each framework stage has a short explanation, a small number of questions, examples, a voice input button, a text input, and a save action. Answers are editable. The product turns saved answers into a suggested artifact, confidence/evidence status, and one next action.

## Initial framework stages

1. Context and founder goal
2. Customer and market focus
3. Problem discovery
4. Beachhead customer / ICP
5. Value proposition
6. Competitive alternatives
7. Business model and pricing
8. MVP and first test
9. Distribution and first customers
10. Metrics and weekly operating cadence
11. Evidence review and pivot/persevere decision
12. Fundraising readiness

## Personalization inputs

Industry, specific segment, target audience, geography/location, business model, company stage, founder goal, and weekly hours available.

## First implementation slice

The first shipped slice should make the concept visible and interactive in one page: a sidebar showing the build path, a context strip showing personalization, a primary stage card with typed/voice input, an evidence tracker, a focus/next-action panel, and editable workspace artifacts. Use local state/localStorage-compatible patterns now so the product can later map cleanly to a backend.
