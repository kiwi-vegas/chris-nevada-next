import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: 'High-Rise Condos in Las Vegas | Luxury Towers | Nevada Real Estate Group',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/high-rise-condos' },
  description: 'Explore Las Vegas high-rise condos and luxury towers. Veer Towers, Waldorf Astoria, Panorama, Turnberry, Sky, The Martin, and more. Strip views from $200K to $10M+.',
}

export default function HighRisePage() {
  return (
    <LifestyleCollectionPage
      title="High-Rise Condos in Las Vegas"
      description="Las Vegas offers a unique high-rise lifestyle ranging from iconic Strip-adjacent towers with panoramic views to Downtown Arts District loft conversions. These properties deliver resort-style amenities, concierge services, and a lock-and-leave convenience that traditional homes cannot match."
      filterFn={(c) => {
        const type = c.type?.toLowerCase() || ''
        const slugs = ['veer-towers','waldorf-astoria-las-vegas','panorama-towers','turnberry-towers','turnberry-place','sky-las-vegas','allure-las-vegas','juhl','the-ogden','soho-lofts','newport-lofts','the-martin','one-queensridge-place','cello-tower','four-seasons-private-residences']
        return type.includes('high-rise') || type.includes('tower') || type.includes('loft') || slugs.includes(c.slug)
      }}
      seoLabel="High-Rise Condos"
    />
  )
}
