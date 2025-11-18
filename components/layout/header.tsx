import Link from 'next/link'
import { Lightbulb, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6" />
            <span className="text-xl font-bold">IdeaBank</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/ideas"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Browse Ideas
          </Link>
          <Link
            href="/trending"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Trending
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/submit">
              <Plus className="h-4 w-4" />
              Submit Idea
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
