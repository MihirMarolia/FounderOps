import Link from 'next/link'
import { Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IdeaCard } from '@/components/ideas/idea-card'
import { sampleIdeas, sampleUser } from '@/lib/db/seed-data'
import type { IdeaWithRelations } from '@/types'

export default function Home() {
  // Transform sample data to match IdeaWithRelations type
  const featuredIdeas: IdeaWithRelations[] = sampleIdeas.map(idea => ({
    ...idea,
    user: sampleUser,
    analysis: null,
    trends: [],
    resources: [],
    votes: [],
    comments: [],
    _count: {
      votes: idea.upvoteCount,
      comments: Math.floor(Math.random() * 20),
    },
  })) as IdeaWithRelations[]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Next Big Idea
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse AI-analyzed startup ideas with market insights, trend data, and ready-to-use build resources.
            Submit your ideas and get instant AI-powered analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/ideas">
                Browse Ideas
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/submit">
                Submit Your Idea
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 mb-4">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Get instant market analysis, execution plans, and insights powered by Claude AI
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trend Tracking</h3>
              <p className="text-muted-foreground">
                See real-time trend data from Reddit, YouTube, and other platforms
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Build Resources</h3>
              <p className="text-muted-foreground">
                Access AI-generated landing pages, ad creatives, and business plans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ideas Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Ideas</h2>
            <Button variant="ghost" asChild>
              <Link href="/ideas">View All →</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your Idea?</h2>
          <p className="text-xl mb-8 opacity-90">
            Submit your startup idea and get instant AI-powered analysis, market insights, and build resources.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/submit">
              Get Started - It&apos;s Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
