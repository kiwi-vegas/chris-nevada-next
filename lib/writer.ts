import Anthropic from '@anthropic-ai/sdk'
import type { ScoredArticle, BlogPostDraft, PortableTextBlock, PortableTextSpan } from './types'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 96)
}

function makeKey(): string {
  return Math.random().toString(36).slice(2, 10)
}

function textToPortableText(text: string): PortableTextBlock[] {
  const lines = text.split('\n').filter((l) => l.trim())
  return lines.map((line) => {
    const trimmed = line.trim()
    let style: PortableTextBlock['style'] = 'normal'
    let content = trimmed

    if (trimmed.startsWith('## ')) {
      style = 'h2'
      content = trimmed.slice(3)
    } else if (trimmed.startsWith('### ')) {
      style = 'h3'
      content = trimmed.slice(4)
    } else if (trimmed.startsWith('> ')) {
      style = 'blockquote'
      content = trimmed.slice(2)
    }

    const span: PortableTextSpan = {
      _type: 'span',
      _key: makeKey(),
      text: content,
      marks: [],
    }

    return {
      _type: 'block',
      _key: makeKey(),
      style,
      markDefs: [],
      children: [span],
    }
  })
}

const SYSTEM_PROMPT = `You are Claude, creating original, locally-optimized real estate content for the Nevada Real Estate Group website.

You write as Nevada Real Estate Group, a top-performing real estate team led by Chris Nevada, serving Las Vegas, Henderson, North Las Vegas, Summerlin, Reno, and Sparks in Nevada.

Your goals:
- Produce helpful, expert real estate content for Nevada homeowners, buyers, sellers, and investors.
- Optimize for local SEO and Answer Engine Optimization (AEO) so content ranks in Google and is easy for AI/voice assistants to quote.
- Always localize national or state-level news to Southern Nevada and Northern Nevada.
- Write in third person, professional, trustworthy, and conversational — like a local real estate market analyst, not a salesperson. Avoid hype, keep it factual, and focus on what matters to consumers.

GLOBAL RULES:

Originality:
- Do not copy or closely mimic source phrasing.
- Always paraphrase with fresh wording and structure.

Local SEO Targeting:
- Naturally include combinations such as: "Las Vegas real estate market", "Henderson homes for sale", "Summerlin housing trends", "Reno home prices", "Sparks real estate investors".
- Each article should mention at least 3 different local areas from: Las Vegas, Henderson, North Las Vegas, Summerlin, Reno, Sparks.

AEO Optimization:
- Include one primary question phrased like a user search query.
- Include a concise, direct answer to that question near the top (featured-snippet style).
- Use clear H2 headings, short paragraphs (2–3 sentences), and bullet lists where helpful.
- Include a short FAQ section with 3–5 Q&A pairs using natural-language questions.

Helpful, Expert Content:
- Write like an experienced local team with deep knowledge of Nevada neighborhoods, trends, and property types.
- Focus on implications, actionable advice, and local examples.
- Do not provide tax, legal, or guaranteed investment advice.

CTAs:
- End posts with a soft, trust-building CTA, such as: "For a data-driven look at your neighborhood and property type, contact Nevada Real Estate Group for a custom market report."

IMPORTANT STYLE REMINDERS:
- Always write in third person ("Nevada Real Estate Group reports…", "Local buyers are seeing…").
- Keep tone calm, expert, and clear, avoiding exaggerated promises or speculative predictions.
- Use short paragraphs, clear headings, and bullets for readability.
- When data is missing, speak directionally instead of inventing specific numbers.`

export async function writePost(article: ScoredArticle): Promise<BlogPostDraft> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const userPrompt = `mode = "news_rewrite"

INPUTS:
article_title: ${article.title}
url: ${article.url}
summary_excerpt: ${article.content.slice(0, 500)}
why_it_matters: ${article.whyItMatters}

BODY STRUCTURE (follow this exactly):

Length: Aim for 700–1,000 words.

Use these H2 sections in order:

1. Intro Paragraph(s) — 1–2 short paragraphs summarizing the news or trend. Explain why it matters for Nevada buyers, sellers, and investors, especially in Las Vegas and Reno.

2. ## How This Affects the Las Vegas Area — Translate the news into market impact for Las Vegas, Henderson, North Las Vegas, and Summerlin. Use directional language about trends.

3. ## What It Means for Reno–Sparks Homeowners — Localize to Reno and Sparks. Highlight differences vs. Las Vegas.

4. ## Neighborhoods and Property Types Most Impacted — Mention key communities: Summerlin, Henderson, Seven Hills, Green Valley, Mountains Edge, Downtown Las Vegas, Southwest Las Vegas, Spanish Springs, South Reno, Northwest Reno. Discuss which buyer segments/property types are most affected.

5. ## Expert Insights from Nevada Real Estate Group — 2–4 short paragraphs of analysis and context. Objective, data-aware tone; no hype.

6. ## What This Means for You — 4–6 bullet points with concrete, audience-tagged takeaways using "- " prefix:
- "For Las Vegas sellers…"
- "For Summerlin buyers…"
- "For Reno investors…"

7. ## FAQ: Local Questions About This Trend — 3–5 Q&A pairs. Questions should sound like real searches. Answers: 2–3 sentences, balanced and non-speculative. Format each as:
### Q: [question]
[answer]

8. Closing Paragraph — 3–4 sentences summarizing the key takeaway. End with a soft CTA to contact Nevada Real Estate Group for a custom market report.

OUTPUT FORMAT:
Return a JSON object with EXACTLY these fields:
{
  "rewritten_headline": "Original, compelling headline including at least one local term",
  "excerpt": "2-3 sentence hook summarizing the article",
  "seo_title": "Max 60 characters with local + real estate phrase",
  "seo_description": "120-160 characters, include Las Vegas and at least one of Henderson/Summerlin/North Las Vegas/Reno/Sparks",
  "primary_question": "One natural-language question the article answers",
  "concise_answer": "2-4 sentences directly answering the primary question, mentioning Las Vegas and at least one nearby area",
  "body": "The full article body using ## for H2, ### for H3/FAQ questions, and - for bullet points. Include all sections listed above."
}

Return ONLY valid JSON, no markdown fences.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
  const data = JSON.parse(text.trim())

  const bodyText: string = data.body ?? ''

  // Prepend the primary Q&A as a featured snippet block
  const featuredBlocks: PortableTextBlock[] = []
  if (data.primary_question && data.concise_answer) {
    featuredBlocks.push({
      _type: 'block',
      _key: makeKey(),
      style: 'h3',
      markDefs: [],
      children: [{ _type: 'span', _key: makeKey(), text: data.primary_question, marks: [] }],
    })
    featuredBlocks.push({
      _type: 'block',
      _key: makeKey(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: makeKey(), text: data.concise_answer, marks: [] }],
    })
  }

  // Convert body text to blocks
  const bodyBlocks: PortableTextBlock[] = []
  const lines = bodyText.split('\n').filter((l: string) => l.trim())

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('- ')) {
      bodyBlocks.push({
        _type: 'block',
        _key: makeKey(),
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: makeKey(), text: '\u2022 ' + trimmed.slice(2), marks: [] }],
      })
    } else {
      bodyBlocks.push(...textToPortableText(trimmed))
    }
  }

  // Append source credit block
  bodyBlocks.push({
    _type: 'block',
    _key: makeKey(),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: 'sourcelink', href: article.url }],
    children: [
      {
        _type: 'span',
        _key: makeKey(),
        text: `Source: ${article.source ?? article.title}`,
        marks: ['sourcelink'],
      },
    ],
  })

  return {
    title: data.rewritten_headline ?? data.title,
    slug: slugify(data.rewritten_headline ?? data.title),
    excerpt: data.excerpt,
    category: article.category,
    metaTitle: data.seo_title ?? data.rewritten_headline,
    metaDescription: data.seo_description ?? data.excerpt,
    body: [...featuredBlocks, ...bodyBlocks],
    sourceUrl: article.url,
    sourceTitle: article.title,
  }
}
