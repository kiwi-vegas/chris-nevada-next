import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  if (body.secret !== process.env.ADMIN_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.TAVILY_API_KEY}` },
    body: JSON.stringify({ query: 'Las Vegas real estate 2025', max_results: 3 }),
  })
  const data = await res.json()
  return NextResponse.json({ status: res.status, results: data.results?.length ?? 0, error: data.error ?? null, first: data.results?.[0]?.title })
}
