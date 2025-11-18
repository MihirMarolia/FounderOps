import Link from 'next/link'
import { ArrowUp, MessageCircle, Eye } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'
import type { IdeaWithRelations } from '@/types'

interface IdeaCardProps {
  idea: IdeaWithRelations
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link
              href={`/ideas/${idea.slug}`}
              className="hover:underline"
            >
              <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {idea.description}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button variant="outline" size="icon" className="h-12 w-12">
              <ArrowUp className="h-5 w-5" />
            </Button>
            <span className="text-sm font-semibold">
              {formatNumber(idea.upvoteCount)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{idea.category}</Badge>
          <Badge variant="outline">{idea.marketType}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{idea._count?.comments || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{formatNumber(idea.viewCount)}</span>
          </div>
        </div>
        <span className="text-xs">
          by {idea.user.name || idea.user.username || 'Anonymous'}
        </span>
      </CardFooter>
    </Card>
  )
}
