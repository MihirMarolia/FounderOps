-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "IdeaStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'FEATURED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SAAS', 'ECOMMERCE', 'MARKETPLACE', 'TOOL', 'SERVICE', 'OTHER');

-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('B2B', 'B2C', 'B2B2C');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('REDDIT', 'FACEBOOK', 'YOUTUBE', 'TWITTER', 'OTHER');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('AD_CREATIVE', 'BRAND_PACKAGE', 'LANDING_PAGE', 'PITCH_DECK');

-- CreateEnum
CREATE TYPE "AiTool" AS ENUM ('CLAUDE', 'CHATGPT', 'V0', 'LOVABLE');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "IdeaStatus" NOT NULL DEFAULT 'PENDING',
    "category" "Category" NOT NULL,
    "marketType" "MarketType" NOT NULL,
    "targetAudience" TEXT,
    "mainCompetitor" TEXT,
    "pricingModel" TEXT,
    "submittedById" TEXT NOT NULL,
    "approvedById" TEXT,
    "featuredDate" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdeaAnalysis" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "whyNow" JSONB NOT NULL,
    "proofSignals" JSONB NOT NULL,
    "marketGap" JSONB NOT NULL,
    "executionPlan" JSONB NOT NULL,
    "frameworkFit" JSONB,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdeaAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrendData" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "metricName" TEXT NOT NULL,
    "metricValue" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "details" JSONB,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrendData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildResource" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "aiTool" "AiTool" NOT NULL,
    "content" TEXT NOT NULL,
    "promptUsed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuildResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "voteType" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Idea_slug_key" ON "Idea"("slug");

-- CreateIndex
CREATE INDEX "Idea_status_idx" ON "Idea"("status");

-- CreateIndex
CREATE INDEX "Idea_category_idx" ON "Idea"("category");

-- CreateIndex
CREATE INDEX "Idea_slug_idx" ON "Idea"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "IdeaAnalysis_ideaId_key" ON "IdeaAnalysis"("ideaId");

-- CreateIndex
CREATE INDEX "Vote_userId_ideaId_idx" ON "Vote"("userId", "ideaId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_ideaId_key" ON "Vote"("userId", "ideaId");

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaAnalysis" ADD CONSTRAINT "IdeaAnalysis_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendData" ADD CONSTRAINT "TrendData_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildResource" ADD CONSTRAINT "BuildResource_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
