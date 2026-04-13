import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: '55+ Active Adult Communities in Las Vegas | Nevada Real Estate Group',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/55-plus-communities' },
  description: 'Explore 15+ active adult 55+ communities in Las Vegas and Henderson. Sun City Summerlin, Sun City Anthem, Solera, Trilogy. Resort-style living from $300K. Nevada Real Estate Group.',
}

export default function FiftyPlusPage() {
  return (
    <LifestyleCollectionPage
      title="55+ Active Adult Communities in Las Vegas"
      description="Las Vegas is one of the top retirement destinations in the country, and the metro area offers a wide range of 55+ active adult communities with resort-style amenities, golf courses, recreation centers, and organized social programs designed for active retirees."
      filterFn={(c) => {
        const type = c.type?.toLowerCase() || ''
        return type.includes('55+') || type.includes('active adult')
      }}
      seoLabel="55+ Communities"
    />
  )
}
