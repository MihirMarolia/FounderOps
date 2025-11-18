"""FastAPI service that exposes an AI idea breakdown endpoint for FounderOps."""

from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="FounderOps AI Breakdown API")


class IdeaRequest(BaseModel):
    """Input payload for the idea breakdown endpoint."""

    idea: str = Field(..., description="Raw idea text from the founder")


class TaskOutline(BaseModel):
    """Structured task output produced by the AI breakdown."""

    title: str
    category: str
    rationale: str
    duration_minutes: int = Field(
        ..., ge=15, description="Estimated time in minutes for a single focus block"
    )


class ProjectBreakdown(BaseModel):
    """Full project framing returned by the AI breakdown endpoint."""

    project_name: str
    problem: str
    research_plan: List[str]
    milestones: List[str]
    tasks: List[TaskOutline]


def _synthesize_project_breakdown(idea: str) -> ProjectBreakdown:
    """Create a deterministic project breakdown when an LLM is not wired up yet."""

    base_title = idea.strip().split(" ")[0:3]
    project_name = " ".join(base_title).title() or "New Project"

    research_plan = [
        "Validate ICP and persona pain points",
        "Collect 5-7 competitor snapshots",
        "Map high-risk assumptions and dependencies",
    ]

    milestones = [
        "Draft problem framing",
        "Run 5 founder interviews",
        "Ship clickable prototype",
        "Pilot with 10 early users",
    ]

    tasks = [
        TaskOutline(
            title="Define problem statement",
            category="Research",
            rationale="Clarify user pain and constraints before solutioning.",
            duration_minutes=45,
        ),
        TaskOutline(
            title="Create lean canvas",
            category="Planning",
            rationale="Align business model and channels before building.",
            duration_minutes=60,
        ),
        TaskOutline(
            title="Outline MVP experiment",
            category="Build",
            rationale="Set success metrics and scope for first test.",
            duration_minutes=75,
        ),
    ]

    return ProjectBreakdown(
        project_name=project_name,
        problem=f"AI framing for: {idea}",
        research_plan=research_plan,
        milestones=milestones,
        tasks=tasks,
    )


@app.get("/health")
async def health() -> dict:
    """Lightweight health endpoint for container checks."""

    return {"status": "ok"}


@app.post("/api/ai/breakdown", response_model=ProjectBreakdown)
async def ai_breakdown(payload: IdeaRequest) -> ProjectBreakdown:
    """Turn a raw idea into a structured breakdown.

    In production this would call the LLM with schema validation and safety filters.
    """

    idea = payload.idea.strip()
    if not idea:
        raise HTTPException(status_code=400, detail="Idea text is required")

    return _synthesize_project_breakdown(idea)
