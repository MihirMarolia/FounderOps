import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function generateIdeaAnalysis(idea: {
  title: string
  description: string
  category: string
  targetAudience: string
}) {
  const prompt = `Analyze this startup idea and provide detailed insights:

Title: ${idea.title}
Description: ${idea.description}
Category: ${idea.category}
Target Audience: ${idea.targetAudience}

Please provide analysis in JSON format with the following structure:
{
  "whyNow": {
    "trends": ["trend 1", "trend 2", "trend 3"],
    "timing": "explanation of why this is the right time"
  },
  "proofSignals": {
    "dataPoints": ["signal 1", "signal 2", "signal 3"],
    "validation": "validation summary"
  },
  "marketGap": {
    "problem": "core problem statement",
    "currentSolutions": ["solution 1", "solution 2"],
    "gap": "what's missing in the market"
  },
  "executionPlan": {
    "mvp": "minimum viable product description",
    "steps": ["step 1", "step 2", "step 3", "step 4", "step 5"],
    "timeline": "estimated timeline"
  }
}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = response.content[0]
    if (content.type === 'text') {
      // Extract JSON from the response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    }

    throw new Error('Failed to parse AI response')
  } catch (error) {
    console.error('Error generating idea analysis:', error)
    throw error
  }
}

export async function generateBuildResource(
  idea: {
    title: string
    description: string
  },
  resourceType: string
) {
  const prompts: Record<string, string> = {
    AD_CREATIVE: `Create ad creative ideas for this startup: ${idea.title}. Description: ${idea.description}. Provide 3 ad concepts with headlines and copy.`,
    BRAND_PACKAGE: `Create a brand package for this startup: ${idea.title}. Description: ${idea.description}. Include brand voice, color palette, and key messaging.`,
    LANDING_PAGE: `Create a landing page structure for this startup: ${idea.title}. Description: ${idea.description}. Include hero section, features, and CTA.`,
    BUSINESS_PLAN: `Create a business plan outline for this startup: ${idea.title}. Description: ${idea.description}. Include market analysis, revenue model, and growth strategy.`,
    PITCH_DECK: `Create a pitch deck outline for this startup: ${idea.title}. Description: ${idea.description}. Include problem, solution, market size, and traction.`,
  }

  const prompt = prompts[resourceType] || prompts.BUSINESS_PLAN

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = response.content[0]
    if (content.type === 'text') {
      return {
        content: content.text,
        aiTool: 'Claude 3.5 Sonnet',
      }
    }

    throw new Error('Failed to generate resource')
  } catch (error) {
    console.error('Error generating build resource:', error)
    throw error
  }
}
