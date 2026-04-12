/**
 * AI Blog Hero Image Generator
 *
 * Applies thumbnail psychology from the claude-thumbnails skill:
 *   1. Visual Stun Gun  — stops the scroll
 *   2. Title Value Hunt — reader scans the headline for relevance
 *   3. Visual Validation — thumbnail reinforces the article's promise
 *
 * Pipeline:
 *   Claude → crafts a psychology-driven image prompt
 *   Gemini 3 Pro Image Preview → generates the hero image (16:9)
 *   Fallback: Imagen 4.0 → Gemini 2.5 Flash Image
 *   Sanity CDN → uploaded and referenced
 */

import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenAI, Modality } from '@google/genai'
import { getSanityWriteClient } from './sanity-write'
import type { ScoredArticle } from './types'

export async function generateAndUploadCoverImageGemini(
  article: ScoredArticle
): Promise<{ _type: 'reference'; _ref: string } | null> {
  try {
    const imagePrompt = await buildImagePrompt(article)
    if (!imagePrompt) return null

    console.log(`[image-gen] Prompt built. Calling Gemini 3 Pro Image Preview...`)
    console.log(`[image-gen] Prompt preview: ${imagePrompt.slice(0, 120)}...`)

    const imageBuffer = await generateWithGemini(imagePrompt)
    if (!imageBuffer) return null

    return await uploadToSanity(imageBuffer)
  } catch (err) {
    console.error('[image-gen] Uncaught error:', err instanceof Error ? err.message : err)
    return null
  }
}

// ─── Step 1: Build the image prompt ─────────────────────────────────────────
// Uses a direct template keyed by category — no external API call needed.
// Each category maps to a specific cinematic Nevada scene that works for any
// article in that category, with the article title woven in for context.

const CATEGORY_SCENES: Record<string, string> = {
  'market-update':
    'Photorealistic aerial photograph of a sprawling Las Vegas master-planned community at golden hour, shot from a helicopter with a full-frame camera and 24mm wide-angle lens. Hundreds of terra-cotta-roofed luxury homes arranged along curving streets with mature desert landscaping, palm-lined boulevards, and emerald green golf course fairways weaving between neighborhoods. The warm amber light of late afternoon bathes everything in gold. In the background, the Spring Mountains rise with jagged red and cream layered rock formations glowing orange-pink. The sky transitions from deep cobalt blue to warm peach and gold near the horizon with wispy cirrus clouds. Cinematic depth of field, 16:9 widescreen. No text, no signs, no visible faces, no logos.',
  'buying-tips':
    'Photorealistic photograph of a stunning modern luxury home in Henderson, Nevada at golden hour. The home features clean contemporary architecture with floor-to-ceiling windows reflecting the desert sunset, a pristine pool with turquoise water in the foreground, and mature desert landscaping with agave and palm trees. Behind the home, dramatic mountain views with layers of desert hills fading into a warm peach and lavender sky. Shot on a full-frame camera with a 24mm lens, rule of thirds composition, strong leading lines from the pool edge toward the mountain backdrop. Rich warm tones, cinematic quality. 16:9 widescreen. No text, no signs, no visible faces, no logos.',
  'selling-tips':
    'Photorealistic photograph of a beautifully staged luxury home exterior in Summerlin, Las Vegas at sunset. A Mediterranean-style elevation with warm stone facade, manicured front yard with desert landscaping, and a wide circular driveway. Golden hour light creates long dramatic shadows and warm highlights on the stone. The Red Rock Canyon escarpment glows orange-pink in the distant background under a spectacular Nevada sky with streaks of coral and gold clouds. Shot on a full-frame camera with a 35mm lens, inviting curb appeal composition. 16:9 widescreen. No text, no signs, no for-sale signs, no visible faces, no logos.',
  'community-spotlight':
    'Photorealistic aerial photograph of a premium Las Vegas master-planned community park and recreation area at golden hour. A sparkling community pool complex with turquoise water, surrounded by palm trees and walking paths that wind through native desert gardens. Luxury homes with red tile roofs line the surrounding streets. In the background, the Las Vegas valley stretches toward distant mountains under a dramatic Nevada sky with warm golden light. Shot from above with a drone-style perspective, full-frame quality, 24mm wide angle. Lush yet desert-appropriate landscaping creates an oasis feeling. 16:9 widescreen. No text, no signs, no visible faces, no logos.',
  investment:
    'Photorealistic aerial photograph showing the scale of Las Vegas development and growth. A sweeping view of new construction neighborhoods expanding into the desert, with completed luxury homes in the foreground transitioning to active construction sites and then raw desert land in the background. Cranes and framing visible at tasteful distance. The Las Vegas Strip skyline is a shimmering silhouette on the horizon. Shot at golden hour with warm light emphasizing growth and momentum. Full-frame camera, 24mm wide angle, cinematic depth. The sky is dramatic with scattered clouds catching golden and coral light. 16:9 widescreen. No text, no signs, no visible faces, no logos.',
  news:
    'Photorealistic photograph of the Las Vegas skyline at dusk, shot from an elevated desert vantage point west of the city. The Strip and downtown buildings create a glowing cluster of lights against a deep twilight sky transitioning from navy blue to warm amber at the horizon. In the foreground, a luxury Summerlin neighborhood with warmly lit homes and palm-lined streets leads the eye toward the city center. The composition creates a sense of energy and momentum — a city that is thriving. Shot on a full-frame camera with a 35mm lens, rich colors, cinematic quality. 16:9 widescreen. No text, no signs, no visible faces, no logos.',
}

async function buildImagePrompt(article: ScoredArticle): Promise<string | null> {
  // First try Claude for a custom, article-specific prompt
  try {
    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      console.log('[image-gen] Trying Claude for custom image prompt...')

      const scene = CATEGORY_SCENES[article.category] ?? CATEGORY_SCENES['news']

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `Write a photorealistic image generation prompt for a blog hero image. The article is about: "${article.title}" — ${article.whyItMatters}

Base your prompt on this scene template but make it specific to the article topic:
${scene}

Return ONLY the prompt text, 5-8 sentences. No explanation, no markdown.`,
          },
        ],
      })

      const text = response.content[0].type === 'text' ? response.content[0].text.trim() : null
      if (text && text.length > 50) {
        console.log('[image-gen] Claude custom prompt built successfully')
        return text
      }
    }
  } catch (err) {
    console.warn('[image-gen] Claude unavailable, using direct template:', err instanceof Error ? err.message : err)
  }

  // Fallback: use the category template directly — no Claude needed
  const template = CATEGORY_SCENES[article.category] ?? CATEGORY_SCENES['news']
  console.log(`[image-gen] Using direct template for category: ${article.category}`)
  return template
}

// ─── Step 2: Gemini generates the image ──────────────────────────────────────
// Primary: gemini-3-pro-image-preview (best quality + 16:9)
// Fallback 1: Imagen 4.0
// Fallback 2: Gemini 2.5 Flash Image

async function generateWithGemini(prompt: string): Promise<Buffer | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })

  // Primary: gemini-3-pro-image-preview
  try {
    console.log('[image-gen] Calling gemini-3-pro-image-preview...')
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        imageConfig: { aspectRatio: '16:9' },
      },
    })
    const parts = response.candidates?.[0]?.content?.parts ?? []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buf = Buffer.from(part.inlineData.data, 'base64')
        console.log(`[image-gen] gemini-3-pro-image-preview SUCCESS — ${Math.round(buf.length / 1024)}KB image`)
        return buf
      }
    }
    console.warn('[image-gen] gemini-3-pro-image-preview returned no image data')
  } catch (err) {
    console.error('[image-gen] gemini-3-pro-image-preview error:', err instanceof Error ? err.message : err)
  }

  // Fallback 1: Imagen 4.0
  try {
    console.log('[image-gen] Falling back to Imagen 4.0...')
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: { numberOfImages: 1, aspectRatio: '16:9' },
    })
    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes
    if (imageBytes) {
      const buf = Buffer.isBuffer(imageBytes) ? imageBytes : Buffer.from(imageBytes as string, 'base64')
      console.log(`[image-gen] Imagen 4.0 SUCCESS — ${Math.round(buf.length / 1024)}KB image`)
      return buf
    }
  } catch (err) {
    console.error('[image-gen] Imagen 4.0 error:', err instanceof Error ? err.message : err)
  }

  // Fallback 2: Gemini 2.5 Flash Image
  try {
    console.log('[image-gen] Falling back to Gemini 2.5 Flash Image...')
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: { responseModalities: [Modality.IMAGE] },
    })
    const parts = response.candidates?.[0]?.content?.parts ?? []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buf = Buffer.from(part.inlineData.data, 'base64')
        console.log(`[image-gen] Gemini 2.5 Flash SUCCESS — ${Math.round(buf.length / 1024)}KB image`)
        return buf
      }
    }
  } catch (err) {
    console.error('[image-gen] Gemini 2.5 Flash error:', err instanceof Error ? err.message : err)
  }

  console.error('[image-gen] All Google AI models failed — falling back to OG/stock image')
  return null
}

// ─── Step 3: Upload buffer to Sanity CDN ─────────────────────────────────────

async function uploadToSanity(
  buffer: Buffer
): Promise<{ _type: 'reference'; _ref: string } | null> {
  try {
    const client = getSanityWriteClient()
    const asset = await client.assets.upload('image', buffer, {
      filename: `google-ai-cover-${Date.now()}.png`,
      contentType: 'image/png',
    })
    console.log(`[image-gen] Uploaded to Sanity: ${asset._id}`)
    return { _type: 'reference', _ref: asset._id }
  } catch (err) {
    console.error('[image-gen] Sanity upload error:', err instanceof Error ? err.message : err)
    return null
  }
}
