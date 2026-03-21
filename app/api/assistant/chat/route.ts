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
- Update page headlines and text
- Replace hero images or section images when Chris uploads one
- Update homepage headlines and CTA text
- Read current content to verify what's there

WHAT YOU CANNOT DO (decline politely if asked):
- Delete any pages, documents, or content permanently
- Change CSS styles, colors, fonts, or layouts
- Modify navigation structure or footer links
- Change YLOPO property search widget parameters
- Edit code or configuration files
- Add or remove entire page sections
- Modify blog posts or reviews

Always confirm exactly what you changed, including the community name and field. If a change will be live in 60 seconds, say so. If you're unsure which community Chris means, ask for clarification.

Be friendly, efficient, and specific. Chris is not technical — speak in plain English.`

export const maxDuration = 60

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { messages?: any[]; imageBase64?: string; mimeType?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { messages = [] } = body

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  let conversationMessages: Anthropic.MessageParam[] = messages

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
        const result = await executeToolCall(block.name, block.input as Record<string, any>)
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
