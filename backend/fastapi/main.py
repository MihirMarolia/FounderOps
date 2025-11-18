from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

app = FastAPI(title="FounderOps AI Breakdown API")


class IdeaRequest(BaseModel):
  idea: str = Field(..., description="Raw idea text from the founder")


class TaskOutline(BaseModel):
  title: str
  category: str
  rationale: str
  duration_minutes: int = Field(..., ge=15, description="Estimated time in minutes")


class ProjectBreakdown(BaseModel):
  project_name: str
  problem: str
  research_plan: List[str]
  milestones: List[str]
  tasks: List[TaskOutline]


@app.post('/api/ai/breakdown', response_model=ProjectBreakdown)
async def ai_breakdown(payload: IdeaRequest) -> ProjectBreakdown:
  if not payload.idea.strip():
    raise HTTPException(status_code=400, detail="Idea text is required")

  # Placeholder logic: in production, call the LLM with guardrails and schema validation
  base_title = payload.idea.strip().split(" ")[0:3]
  project_name = ' '.join(base_title).title() or 'New Project'

  research_plan = [
    "Validate ICP and persona pain points",
    "Collect 5-7 competitor snapshots",
    "Map high-risk assumptions and dependencies"
  ]

  milestones = [
    "Draft problem framing",
    "Run 5 founder interviews",
    "Ship clickable prototype",
    "Pilot with 10 early users"
  ]

  tasks = [
    TaskOutline(
      title="Define problem statement",
      category="Research",
      rationale="Clarify user pain and constraints before solutioning.",
      duration_minutes=45
    ),
    TaskOutline(
      title="Create lean canvas",
      category="Planning",
      rationale="Align business model and channels before building.",
      duration_minutes=60
    ),
    TaskOutline(
      title="Outline MVP experiment",
      category="Build",
      rationale="Set success metrics and scope for first test.",
      duration_minutes=75
    )
  ]

  return ProjectBreakdown(
    project_name=project_name,
    problem=f"AI framing for: {payload.idea}",
    research_plan=research_plan,
    milestones=milestones,
    tasks=tasks
  )
