import { Idea, User, IdeaAnalysis, Vote, Comment, TrendData, BuildResource } from '@prisma/client'

export type IdeaWithRelations = Idea & {
  user: User
  analysis?: IdeaAnalysis | null
  trends: TrendData[]
  resources: BuildResource[]
  votes: Vote[]
  comments: Comment[]
  _count?: {
    votes: number
    comments: number
  }
}

export type CommentWithUser = Comment & {
  user: User
  replies: CommentWithUser[]
}

export interface IdeaFilters {
  category?: string
  marketType?: string
  status?: string
  sortBy?: 'recent' | 'popular' | 'trending'
  search?: string
}

export interface CreateIdeaInput {
  title: string
  description: string
  category: string
  marketType: string
  targetAudience: string
}
