import Anthropic from '@anthropic-ai/sdk'
import type { RawArticle, ScoredArticle, ArticleCategory } from './types'
import { getSkippedUrls } from './store'

const SEARCH_QUERIES = [
  // Property values & investment — buyer/owner impact
  'Las Vegas real estate market news 2025',
  'Las Vegas home prices forecast appreciation 2025',
  'Henderson Summerlin home values market update 2025',
  'Reno Nevada real estate market trends 2025',
  'Las Vegas investment property rental market returns',
  'Nevada real estate investment opportunity outlook 2025',

  // Law & policy changes affecting homeowners
  'Nevada homeowner law changes 2025 property rights',
  'Nevada property tax changes homeowners exemptions 2025',
  'Nevada HOA law regulations changes 2025',
  'Las Vegas zoning development law changes 2025',
  'Nevada real estate legislation buyers sellers 2025',

  // Major development projects & economic growth signals
  'Las Vegas major development projects jobs economy 2025',
  'Las Vegas new construction billion dollar development',
  'Nevada corporate relocation headquarters Las Vegas 2025',
  'Las Vegas stadium arena district development',
  'Nevada data center tech campus expansion 2025',
  'Reno Nevada economic growth development 2025',

  // Celebrity & high-profile moves to Las Vegas / Nevada
  'celebrity moving Las Vegas Nevada 2025',
  'billionaire executive relocating Las Vegas Nevada',
  'Las Vegas luxury real estate high profile purchase 2025',

  // Big corporate investments (Tesla-scale signals)
  'major company factory warehouse Las Vegas Nevada 2025',
  'Tesla Apple Google Microsoft Nevada facility expansion',
  'Las Vegas economy jobs growth Fortune 500 2025',

  // Relocation & lifestyle (California migration)
  'California residents moving to Las Vegas Nevada',
  'Nevada relocation migration population growth 2025',
]

// Pick 8 queries per day, rotating through the full list so all topics get covered
function getQueriesForToday(): string[] {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  const start = (dayOfYear * 8) % SEARCH_QUERIES.length
  const queries: string[] = []
  for (let i = 0; i < 8; i++) {
    queries.push(SEARCH_QUERIES[(start + i) % SEARCH_QUERIES.length])
  }
  return queries
}

export async function fetchAndScoreArticles(): Promise<ScoredArticle[]> {
  const queries = getQueriesForToday()
  const tavilyApiKey = process.env.TAVILY_API_KEY
  if (!tavilyApiKey) throw new Error('TAVILY_API_KEY is not set')

  // Run all 6 Tavily searches
  const rawArticles: RawArticle[] = []
  const seenUrls = new Set<string>()

  for (const query of queries) {
    try {
      const res = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tavilyApiKey}`,
        },
        body: JSON.stringify({
          query,
          search_depth: 'basic',
          max_results: 7,
          include_answer: false,
        }),
      })
      if (!res.ok) continue
      const data = await res.json()
      for (const result of data.results ?? []) {
        if (!seenUrls.has(result.url)) {
          seenUrls.add(result.url)
          rawArticles.push({
            id: `article_${rawArticles.length}`,
            title: result.title,
            url: result.url,
            content: result.content ?? '',
            publishedDate: result.published_date,
            source: new URL(result.url).hostname.replace('www.', ''),
          })
        }
      }
    } catch {
      // Skip failed queries silently
    }
  }

  if (rawArticles.length === 0) return []

  // Filter out articles the operator has skipped twice without picking
  const skippedUrls = await getSkippedUrls()
  const filteredArticles = skippedUrls.size > 0
    ? rawArticles.filter((a) => !skippedUrls.has(a.url))
    : rawArticles

  if (filteredArticles.length === 0) return []

  // Claude scores and categorizes the articles
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const articleList = filteredArticles
    .slice(0, 30) // cap at 30 to stay within token budget
    .map(
      (a, i) =>
        `[${i}] TITLE: ${a.title}\nURL: ${a.url}\nSNIPPET: ${a.content.slice(0, 300)}\nDATE: ${a.publishedDate ?? 'unknown'}`
    )
    .join('\n\n')

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `You are a real estate content strategist for Nevada Real Estate Group, a luxury real estate agency serving Las Vegas and Reno, NV. Their clients are home buyers, sellers, and investors in Nevada.

Evaluate these articles and return a JSON array. For each article, assign:
- relevanceScore: 1-10 (how useful/interesting is this for Nevada homebuyers, sellers, or investors?)
- category: one of "market-update" | "buying-tips" | "selling-tips" | "community-spotlight" | "investment" | "news"
- whyItMatters: exactly 2 sentences explaining why a Nevada homeowner or buyer should care

SCORING PRIORITY (give extra weight to):
1. Las Vegas / Reno property values and investment returns — what affects buyers and current homeowners
2. Nevada law changes affecting homeowners (property tax, HOA rules, zoning, tenant/landlord laws)
3. Major development projects bringing jobs and economic growth to Las Vegas or Reno (stadiums, tech campuses, factories, corporate HQ relocations)
4. High-profile celebrity or executive moves to Las Vegas or Nevada — signals lifestyle appeal and market confidence
5. Large corporate investments in Nevada (major employers opening facilities, data centers, manufacturing plants)

Return ONLY a valid JSON array with objects in this format:
{"index": 0, "relevanceScore": 8, "category": "market-update", "whyItMatters": "..."}

Drop articles scoring below 5. Keep the top 10 by score.

Articles to evaluate:
${articleList}`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\[[\s\S]*\]/)
  if (!jsonMatch) return []

  const scored: Array<{
    index: number
    relevanceScore: number
    category: ArticleCategory
    whyItMatters: string
  }> = JSON.parse(jsonMatch[0])

  return scored
    .filter((s) => s.relevanceScore >= 4)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10)
    .map((s) => ({
      ...filteredArticles[s.index],
      relevanceScore: s.relevanceScore,
      category: s.category,
      whyItMatters: s.whyItMatters,
    }))
}
