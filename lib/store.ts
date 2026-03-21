import { Redis } from '@upstash/redis'
import type { StoredArticles } from './types'

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN')
  return new Redis({ url, token })
}

const TTL_SECONDS = 48 * 60 * 60 // 48 hours

export async function storeArticles(date: string, data: StoredArticles): Promise<void> {
  const redis = getRedis()
  await redis.set(`articles:${date}`, JSON.stringify(data), { ex: TTL_SECONDS })
}

export async function loadArticles(date: string): Promise<StoredArticles | null> {
  const redis = getRedis()
  const raw = await redis.get<string>(`articles:${date}`)
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}
