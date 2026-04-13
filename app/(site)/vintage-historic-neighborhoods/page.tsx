import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: 'Vintage & Historic Neighborhoods in Las Vegas | Nevada Real Estate Group',
  description: 'Explore Las Vegas vintage and historic neighborhoods. Scotch 80s, Rancho Circle, Las Vegas Country Club, Old Town Henderson. Character homes with large lots from $300K to $8M+.',
}

export default function VintagePage() {
  return (
    <LifestyleCollectionPage
      title="Vintage & Historic Neighborhoods in Las Vegas"
      description="Before the master-planned communities, Las Vegas had character neighborhoods with mature trees, oversized lots, and architectural diversity. These vintage and historic areas offer a lifestyle that new construction cannot replicate — walkable streets, established character, and proximity to the urban core."
      filterFn={(c) => {
        const slugs = ['scotch-80s', 'rancho-circle', 'rancho-bel-air', 'rancho-manor', 'las-vegas-country-club', 'henderson-old-town', 'las-vegas-arts-district', 'las-vegas-charleston-heights', 'las-vegas-meadows-village', 'las-vegas-chinatown', 'downtown-las-vegas']
        const type = c.type?.toLowerCase() || ''
        return slugs.includes(c.slug) || type.includes('vintage') || type.includes('historic')
      }}
      seoLabel="Vintage & Historic Neighborhoods"
    />
  )
}
