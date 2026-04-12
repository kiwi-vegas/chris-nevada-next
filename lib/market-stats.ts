/**
 * Market Stats — reads Zillow data from public/data/market-stats.json
 *
 * Usage in community pages:
 *   const stats = await getMarketStats('summerlin')
 *   stats.medianSalePrice  // "$642,000"
 *   stats.avgDaysToClose   // "83"
 *
 * Data is refreshed by running: npx tsx scripts/fetch-zillow-data.ts
 * Source: Zillow Research (free, attribution required)
 */

import { readFileSync } from 'fs'
import { join } from 'path'

export interface CommunityMarketStats {
  homeValue: string
  homeValueRaw: number | null
  medianSalePrice: string
  medianSalePriceRaw: number | null
  medianListPrice: string
  medianListPriceRaw: number | null
  newListings: string
  newPending: string
  avgDaysToClose: string
  saleToListRatio: string
  priceCutPercent: string
}

export interface MarketStatsResult {
  stats: CommunityMarketStats
  meta: {
    source: string
    attribution: string
    fetchedAt: string
    latestDataDate: string
  }
}

let cachedData: any = null

function loadData() {
  if (cachedData) return cachedData
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'market-stats.json')
    const raw = readFileSync(filePath, 'utf-8')
    cachedData = JSON.parse(raw)
    return cachedData
  } catch {
    return null
  }
}

const FALLBACK_STATS: CommunityMarketStats = {
  homeValue: 'N/A',
  homeValueRaw: null,
  medianSalePrice: 'N/A',
  medianSalePriceRaw: null,
  medianListPrice: 'N/A',
  medianListPriceRaw: null,
  newListings: 'N/A',
  newPending: 'N/A',
  avgDaysToClose: 'N/A',
  saleToListRatio: 'N/A',
  priceCutPercent: 'N/A',
}

export function getMarketStats(communitySlug: string): MarketStatsResult | null {
  const data = loadData()
  if (!data) return null

  const community = data.communities?.[communitySlug]
  if (!community) return null

  return {
    stats: { ...FALLBACK_STATS, ...community.stats },
    meta: data._meta,
  }
}
