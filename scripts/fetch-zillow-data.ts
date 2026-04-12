/**
 * Zillow Market Data Fetcher
 *
 * Downloads free Zillow Research CSVs and extracts Nevada market stats
 * for all community pages. Run monthly or on-demand:
 *
 *   npx tsx scripts/fetch-zillow-data.ts
 *
 * Output: public/data/market-stats.json
 * Source: https://www.zillow.com/research/data/ (free, attribution required)
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// ── Zillow CSV download URLs ────────────────────────────────────────────────────

const DATASETS = {
  zhvi: {
    // Zillow Home Value Index — typical home value
    zip: 'https://files.zillowstatic.com/research/public_csvs/zhvi/Zip_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/zhvi/Neighborhood_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/zhvi/City_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv',
  },
  median_sale_price: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/median_sale_price/Zip_median_sale_price_uc_sfrcondo_sm_sa_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/median_sale_price/Neighborhood_median_sale_price_uc_sfrcondo_sm_sa_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/median_sale_price/City_median_sale_price_uc_sfrcondo_sm_sa_month.csv',
  },
  median_list_price: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/mlp/Zip_mlp_uc_sfrcondo_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/mlp/Neighborhood_mlp_uc_sfrcondo_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/mlp/City_mlp_uc_sfrcondo_month.csv',
  },
  new_listings: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/new_listings/Zip_new_listings_uc_sfrcondo_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/new_listings/Neighborhood_new_listings_uc_sfrcondo_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/new_listings/City_new_listings_uc_sfrcondo_month.csv',
  },
  new_pending: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/new_pending/Zip_new_pending_uc_sfrcondo_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/new_pending/Neighborhood_new_pending_uc_sfrcondo_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/new_pending/City_new_pending_uc_sfrcondo_month.csv',
  },
  mean_days_to_close: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/mean_days_to_close/Zip_mean_days_to_close_uc_sfrcondo_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/mean_days_to_close/Neighborhood_mean_days_to_close_uc_sfrcondo_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/mean_days_to_close/City_mean_days_to_close_uc_sfrcondo_month.csv',
  },
  mean_sale_to_list: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/mean_sale_to_list/Zip_mean_sale_to_list_uc_sfrcondo_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/mean_sale_to_list/Neighborhood_mean_sale_to_list_uc_sfrcondo_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/mean_sale_to_list/City_mean_sale_to_list_uc_sfrcondo_month.csv',
  },
  price_cuts: {
    zip: 'https://files.zillowstatic.com/research/public_csvs/perc_listings_price_cut/Zip_perc_listings_price_cut_uc_sfrcondo_month.csv',
    neighborhood: 'https://files.zillowstatic.com/research/public_csvs/perc_listings_price_cut/Neighborhood_perc_listings_price_cut_uc_sfrcondo_month.csv',
    city: 'https://files.zillowstatic.com/research/public_csvs/perc_listings_price_cut/City_perc_listings_price_cut_uc_sfrcondo_month.csv',
  },
}

// ── Community → ZIP code + neighborhood mapping ─────────────────────────────────

const COMMUNITY_MAP: Record<string, { zips: string[]; neighborhoods: string[]; city: string }> = {
  'summerlin': { zips: ['89134', '89135', '89138', '89144', '89145'], neighborhoods: ['Summerlin North', 'Summerlin South', 'Sun City Summerlin'], city: 'Las Vegas' },
  'summerlin-west': { zips: ['89138'], neighborhoods: ['Summerlin South'], city: 'Las Vegas' },
  'henderson': { zips: ['89002', '89011', '89012', '89014', '89015', '89052', '89074'], neighborhoods: ['Anthem', 'Green Valley', 'Seven Hills'], city: 'Henderson' },
  'anthem': { zips: ['89052'], neighborhoods: ['Anthem'], city: 'Henderson' },
  'cadence': { zips: ['89011'], neighborhoods: [], city: 'Henderson' },
  'inspirada': { zips: ['89044'], neighborhoods: [], city: 'Henderson' },
  'green-valley-ranch': { zips: ['89012', '89014', '89052'], neighborhoods: ['Green Valley', 'Green Valley Ranch'], city: 'Henderson' },
  'seven-hills': { zips: ['89052'], neighborhoods: ['Seven Hills'], city: 'Henderson' },
  'lake-las-vegas': { zips: ['89011'], neighborhoods: ['Lake Las Vegas'], city: 'Henderson' },
  'macdonald-highlands': { zips: ['89012'], neighborhoods: [], city: 'Henderson' },
  'whitney-ranch': { zips: ['89014'], neighborhoods: [], city: 'Henderson' },
  'tuscany-village': { zips: ['89014'], neighborhoods: [], city: 'Henderson' },
  'silverado-ranch': { zips: ['89123', '89183'], neighborhoods: ['Silverado Ranch'], city: 'Las Vegas' },
  'southern-highlands': { zips: ['89141', '89178'], neighborhoods: ['Southern Highlands'], city: 'Las Vegas' },
  'mountains-edge': { zips: ['89141', '89178'], neighborhoods: ['Mountains Edge'], city: 'Las Vegas' },
  'enterprise': { zips: ['89113', '89139', '89141', '89178'], neighborhoods: ['Enterprise'], city: 'Las Vegas' },
  'spring-valley': { zips: ['89113', '89117', '89147'], neighborhoods: ['Spring Valley'], city: 'Las Vegas' },
  'paradise': { zips: ['89109', '89119', '89121', '89169'], neighborhoods: ['Paradise'], city: 'Las Vegas' },
  'the-lakes': { zips: ['89117', '89128'], neighborhoods: ['The Lakes'], city: 'Las Vegas' },
  'desert-shores': { zips: ['89128'], neighborhoods: ['Desert Shores'], city: 'Las Vegas' },
  'rhodes-ranch': { zips: ['89148'], neighborhoods: ['Rhodes Ranch'], city: 'Las Vegas' },
  'red-rock-country-club': { zips: ['89135'], neighborhoods: [], city: 'Las Vegas' },
  'north-las-vegas': { zips: ['89030', '89031', '89032', '89033', '89081', '89084', '89085', '89086'], neighborhoods: [], city: 'North Las Vegas' },
  'aliante': { zips: ['89084', '89085'], neighborhoods: ['Aliante'], city: 'North Las Vegas' },
  'skye-canyon': { zips: ['89166'], neighborhoods: ['Skye Canyon'], city: 'Las Vegas' },
  'centennial-hills': { zips: ['89131', '89149'], neighborhoods: ['Centennial Hills'], city: 'Las Vegas' },
  'lone-mountain': { zips: ['89129', '89131'], neighborhoods: [], city: 'Las Vegas' },
  'providence': { zips: ['89166'], neighborhoods: [], city: 'North Las Vegas' },
  'boulder-city': { zips: ['89005'], neighborhoods: [], city: 'Boulder City' },
}

// ── CSV parsing ─────────────────────────────────────────────────────────────────

function parseCSV(text: string): string[][] {
  const lines = text.split('\n').filter(l => l.trim())
  return lines.map(line => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue }
      if (ch === ',' && !inQuotes) { result.push(current); current = ''; continue }
      current += ch
    }
    result.push(current)
    return result
  })
}

function getLatestValue(row: string[], startCol: number): { value: string; date: string } | null {
  for (let i = row.length - 1; i >= startCol; i--) {
    if (row[i] && row[i].trim()) {
      return { value: row[i].trim(), date: '' }
    }
  }
  return null
}

// ── Main ────────────────────────────────────────────────────────────────────────

interface MetricData {
  byZip: Record<string, string>
  byNeighborhood: Record<string, string>
  byCity: Record<string, string>
  latestDate: string
}

async function fetchAndParse(url: string, filterState: string = 'NV'): Promise<{ headers: string[]; rows: string[][] }> {
  console.log(`  Fetching ${url.split('/').pop()}...`)
  const res = await fetch(url)
  const text = await res.text()
  const parsed = parseCSV(text)
  const headers = parsed[0]

  // Find the state column
  const stateCol = headers.findIndex(h => h === 'State' || h === 'StateName')
  if (stateCol === -1) return { headers, rows: parsed.slice(1) }

  const filtered = parsed.slice(1).filter(row => row[stateCol] === filterState)
  return { headers, rows: filtered }
}

async function fetchMetric(urls: { zip: string; neighborhood: string; city: string }): Promise<MetricData> {
  const result: MetricData = { byZip: {}, byNeighborhood: {}, byCity: {}, latestDate: '' }

  // ZIP level
  const zipData = await fetchAndParse(urls.zip)
  const zipNameCol = zipData.headers.findIndex(h => h === 'RegionName')
  const zipDataStart = zipData.headers.findIndex(h => /^\d{4}-\d{2}/.test(h))
  result.latestDate = zipData.headers[zipData.headers.length - 1] || ''
  for (const row of zipData.rows) {
    const latest = getLatestValue(row, zipDataStart)
    if (latest && row[zipNameCol]) {
      result.byZip[row[zipNameCol]] = latest.value
    }
  }

  // Neighborhood level
  const nhData = await fetchAndParse(urls.neighborhood)
  const nhNameCol = nhData.headers.findIndex(h => h === 'RegionName')
  const nhDataStart = nhData.headers.findIndex(h => /^\d{4}-\d{2}/.test(h))
  for (const row of nhData.rows) {
    const latest = getLatestValue(row, nhDataStart)
    if (latest && row[nhNameCol]) {
      result.byNeighborhood[row[nhNameCol]] = latest.value
    }
  }

  // City level
  const cityData = await fetchAndParse(urls.city)
  const cityNameCol = cityData.headers.findIndex(h => h === 'RegionName')
  const cityDataStart = cityData.headers.findIndex(h => /^\d{4}-\d{2}/.test(h))
  for (const row of cityData.rows) {
    const latest = getLatestValue(row, cityDataStart)
    if (latest && row[cityNameCol]) {
      result.byCity[row[cityNameCol]] = latest.value
    }
  }

  return result
}

function lookupCommunityValue(
  metric: MetricData,
  community: { zips: string[]; neighborhoods: string[]; city: string }
): string | null {
  // 1. City level
  const cityVal = metric.byCity[community.city]

  // 2. Neighborhood level — average across matching neighborhoods
  const nhValues = community.neighborhoods
    .map(n => metric.byNeighborhood[n])
    .filter(Boolean)
    .map(Number)
    .filter(v => !isNaN(v))

  // 3. ZIP level — average across matching ZIPs
  const zipValues = community.zips
    .map(z => metric.byZip[z])
    .filter(Boolean)
    .map(Number)
    .filter(v => !isNaN(v))

  // Priority: Community neighborhoods > ZIP codes > City
  if (nhValues.length > 0) {
    return String(nhValues.reduce((a, b) => a + b, 0) / nhValues.length)
  }
  if (zipValues.length > 0) {
    return String(zipValues.reduce((a, b) => a + b, 0) / zipValues.length)
  }
  if (cityVal) return cityVal

  return null
}

function formatPrice(val: string | null): string {
  if (!val) return 'N/A'
  const n = Math.round(Number(val))
  if (isNaN(n)) return 'N/A'
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  return `$${n.toLocaleString('en-US')}`
}

function formatNumber(val: string | null, decimals = 0): string {
  if (!val) return 'N/A'
  const n = Number(val)
  if (isNaN(n)) return 'N/A'
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US')
}

function formatPercent(val: string | null): string {
  if (!val) return 'N/A'
  const n = Number(val)
  if (isNaN(n)) return 'N/A'
  return `${(n * 100).toFixed(1)}%`
}

async function main() {
  console.log('Fetching Zillow market data for Nevada communities...\n')

  // Fetch all metrics
  console.log('1/8 Home Value Index (ZHVI)...')
  const zhvi = await fetchMetric(DATASETS.zhvi)

  console.log('2/8 Median Sale Price...')
  const medianSalePrice = await fetchMetric(DATASETS.median_sale_price)

  console.log('3/8 Median List Price...')
  const medianListPrice = await fetchMetric(DATASETS.median_list_price)

  console.log('4/8 New Listings...')
  const newListings = await fetchMetric(DATASETS.new_listings)

  console.log('5/8 Pending Sales...')
  const newPending = await fetchMetric(DATASETS.new_pending)

  console.log('6/8 Days to Close...')
  const daysToClose = await fetchMetric(DATASETS.mean_days_to_close)

  console.log('7/8 Sale-to-List Ratio...')
  const saleToList = await fetchMetric(DATASETS.mean_sale_to_list)

  console.log('8/8 Price Cuts...')
  const priceCuts = await fetchMetric(DATASETS.price_cuts)

  // Build per-community stats
  const output: Record<string, any> = {
    _meta: {
      source: 'Zillow Research (zillow.com/research/data/)',
      attribution: 'Data sourced from Zillow Research. Used with permission under Zillow Terms of Use.',
      fetchedAt: new Date().toISOString(),
      latestDataDate: zhvi.latestDate,
    },
    communities: {},
  }

  for (const [slug, community] of Object.entries(COMMUNITY_MAP)) {
    const homeValue = lookupCommunityValue(zhvi, community)
    const salePrice = lookupCommunityValue(medianSalePrice, community)
    const listPrice = lookupCommunityValue(medianListPrice, community)
    const listings = lookupCommunityValue(newListings, community)
    const pending = lookupCommunityValue(newPending, community)
    const dom = lookupCommunityValue(daysToClose, community)
    const stl = lookupCommunityValue(saleToList, community)
    const cuts = lookupCommunityValue(priceCuts, community)

    output.communities[slug] = {
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      city: community.city,
      zips: community.zips,
      neighborhoods: community.neighborhoods,
      stats: {
        homeValue: formatPrice(homeValue),
        homeValueRaw: homeValue ? Math.round(Number(homeValue)) : null,
        medianSalePrice: formatPrice(salePrice),
        medianSalePriceRaw: salePrice ? Math.round(Number(salePrice)) : null,
        medianListPrice: formatPrice(listPrice),
        medianListPriceRaw: listPrice ? Math.round(Number(listPrice)) : null,
        newListings: formatNumber(listings),
        newPending: formatNumber(pending),
        avgDaysToClose: formatNumber(dom),
        saleToListRatio: formatPercent(stl),
        priceCutPercent: formatPercent(cuts),
      },
    }

    console.log(`  ${slug}: ${formatPrice(salePrice || homeValue)} median | ${formatNumber(dom)} days`)
  }

  // Write output
  const outDir = join(process.cwd(), 'public', 'data')
  mkdirSync(outDir, { recursive: true })
  const outPath = join(outDir, 'market-stats.json')
  writeFileSync(outPath, JSON.stringify(output, null, 2))
  console.log(`\nDone! Written to ${outPath}`)
  console.log(`Latest data: ${zhvi.latestDate}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
