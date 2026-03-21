import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { getSanityWriteClient } from './sanity-write'
import type { ScoredArticle } from './types'

/**
 * Uses Claude to write a DALL-E 3 prompt tailored to the article,
 * then generates the image and uploads it to Sanity.
 */
export async function generateAndUploadCoverImage(
  article: ScoredArticle
): Promise<{ _type: 'reference'; _ref: string } | null> {
  try {
    const imagePrompt = await buildImagePrompt(article)
    if (!imagePrompt) return null

    const imageUrl = await generateWithDalle(imagePrompt)
    if (!imageUrl) return null

    return await uploadToSanity(imageUrl)
  } catch {
    return null
  }
}

// ─── Step 1: Claude writes the DALL-E prompt ─────────────────────────────────

async function buildImagePrompt(article: ScoredArticle): Promise<string | null> {
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are writing an image generation prompt for a real estate blog post cover image.

The image should look like a bold, eye-catching YouTube thumbnail — cinematic, conceptual, photorealistic.
It must visually represent the SPECIFIC story of this article, not generic real estate.

Article title: ${article.title}
Article summary: ${article.whyItMatters}
Category: ${article.category}

Write a single DALL-E 3 image prompt (2-4 sentences). Requirements:
- Describe a specific, vivid scene that captures the article's core story
- Style: photorealistic, cinematic lighting, bold colors, YouTube thumbnail composition
- Landscape orientation (16:9)
- No text, logos, or watermarks in the image
- No people's faces clearly visible (avoids likeness issues)
- DO NOT mention "blog post", "thumbnail", or "real estate agent"

Return ONLY the prompt text, nothing else.`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : null
    return text
  } catch {
    return null
  }
}

// ─── Step 2: DALL-E 3 generates the image ────────────────────────────────────

async function generateWithDalle(prompt: string): Promise<string | null> {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
      response_format: 'url',
    })

    return response.data?.[0]?.url ?? null
  } catch (err) {
    console.error('[image-gen] DALL-E 3 error:', err instanceof Error ? err.message : err)
    return null
  }
}

// ─── Step 3: Download and upload to Sanity CDN ───────────────────────────────

async function uploadToSanity(
  imageUrl: string
): Promise<{ _type: 'reference'; _ref: string } | null> {
  try {
    const client = getSanityWriteClient()

    // DALL-E URLs expire after ~1hr — download immediately
    const res = await fetch(imageUrl, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) return null

    const buffer = Buffer.from(await res.arrayBuffer())

    const asset = await client.assets.upload('image', buffer, {
      filename: `ai-cover-${Date.now()}.png`,
      contentType: 'image/png',
    })

    return { _type: 'reference', _ref: asset._id }
  } catch {
    return null
  }
}
