import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TOOLS, executeToolCall } from '@/lib/assistant-tools'
import { createHmac } from 'crypto'

const COOKIE_NAME = 'assistant_session'
const MAX_TOOL_ITERATIONS = 10

function verifyToken(token: string, secret: string): boolean {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false
  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  return sig === expected
}

const SYSTEM_PROMPT = `You are a content update assistant for Nevada Real Estate Group's website, helping Chris Nevada make changes to the site.

You have access to tools that let you read and update:
- Community page stats ("At a Glance" data like distances, prices, population)
- Community page text (headlines, subheadlines, meta descriptions)
- Community page images (hero background, section images)
- Homepage text fields

WHAT YOU CAN DO:
- Update any stat on any community page ("change the drive to the Strip in Summerlin to 22 minutes")
- Update drive times on the map section of any page
- Update hero stat numbers (Active Listings, Price Range)
- Update page headlines and text
- Replace hero images or section images when Chris uploads one
- Update homepage headlines and CTA text
- Read current content to verify what's there

DRIVE TIMES — critical rules:
Drive time cards on each page have a destination label (e.g. "to Harry Reid Airport", "to the Strip", "to Downtown Las Vegas"). To update a drive time, call update_community_stats with:
- key: the EXACT destination label as it appears on the page, starting with "to" (e.g. "to Harry Reid Airport")
- value: just the time (e.g. "~5 min" or "~22 min")

Examples:
- "Change the drive to Harry Reid Airport on Green Valley Ranch to 5 minutes" → key: "to Harry Reid Airport", value: "~5 min"
- "Update the drive to the Strip in Summerlin to 22 minutes" → key: "to the Strip", value: "~22 min"
- "Set downtown Las Vegas drive time to 18 minutes on Henderson" → key: "to Downtown Las Vegas", value: "~18 min"

DO NOT use the full card text, route, or combine fields into the key. The key is ONLY the destination label.

HERO STATS — to update the numbers in the hero banner:
- "Active listings count" → key: "Active Listings"
- "Price range" → key: "Price Range"

WHAT YOU CANNOT DO (decline politely if asked):
- Delete any pages, documents, or content permanently
- Change CSS styles, colors, fonts, or layouts
- Modify navigation structure or footer links
- Change YLOPO property search widget parameters
- Edit code or configuration files
- Add or remove entire page sections
- Modify blog posts or reviews

IMAGE UPLOADS — follow these rules exactly:
- When Chris attaches an image, it is automatically available in the system. NEVER ask him to upload it again.
- If he hasn't specified which page the image is for, ask him.
- If he hasn't clearly said which section, ask ONE question: "Where should I place this image — the hero background (large banner at the top), the lifestyle section, or somewhere else on the page?"
- Do NOT assume hero unless he explicitly says so.
- Once you know the page and section, call upload_community_image with just slug and role — the image data is injected automatically, do not include imageBase64 or mimeType.
- Image uploads can take up to 30 seconds. Tell Chris "Working on it — uploading the image now, this takes about 30 seconds." before calling the tool.
- Once done, confirm exactly what was updated and that it will be live within 60 seconds.

Always confirm exactly what you changed, including the community name and field. If a change will be live in 60 seconds, say so. If you're unsure which community Chris means, ask for clarification.

Be friendly, efficient, and specific. Chris is not technical — speak in plain English.`

export const maxDuration = 120

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { messages?: any[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { messages = [] } = body

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  let conversationMessages: Anthropic.MessageParam[] = messages

  // Find the most recent image in conversation messages (for auto-injection into upload tool)
  function findLatestImage(): { base64: string; mimeType: string } | null {
    for (let i = conversationMessages.length - 1; i >= 0; i--) {
      const msg = conversationMessages[i]
      if (msg.role !== 'user') continue
      const content = Array.isArray(msg.content) ? msg.content : []
      for (const block of content as any[]) {
        if (block.type === 'image' && block.source?.type === 'base64') {
          return { base64: block.source.data, mimeType: block.source.media_type }
        }
      }
    }
    return null
  }

  // Agentic tool-use loop
  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages: conversationMessages,
    })

    // Append assistant response to conversation
    conversationMessages = [
      ...conversationMessages,
      { role: 'assistant', content: response.content },
    ]

    if (response.stop_reason !== 'tool_use') {
      // Done — extract final text
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('')

      return NextResponse.json({ reply: text, messages: conversationMessages })
    }

    // Execute all tool calls in this response
    const toolResults: Anthropic.ToolResultBlockParam[] = []
    for (const block of response.content) {
      if (block.type !== 'tool_use') continue
      try {
        const input = { ...(block.input as Record<string, any>) }
        // Auto-inject image data for upload tool when Claude omits it
        if (block.name === 'upload_community_image' && !input.imageBase64) {
          const img = findLatestImage()
          if (img) { input.imageBase64 = img.base64; input.mimeType = img.mimeType }
          else { toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: 'Error: No image found in conversation. Ask Chris to attach the image.', is_error: true }); continue }
        }
        const result = await executeToolCall(block.name, input)
        toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: result })
      } catch (err) {
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          is_error: true,
        })
      }
    }

    conversationMessages = [
      ...conversationMessages,
      { role: 'user', content: toolResults },
    ]
  }

  return NextResponse.json({ reply: 'I hit the maximum number of steps. Please try a simpler request.', messages: conversationMessages })
}
