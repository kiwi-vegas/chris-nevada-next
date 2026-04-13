import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: 'New Construction Homes in Las Vegas | Nevada Real Estate Group',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/new-construction' },
  description: 'Explore 40+ new construction communities in Las Vegas, Henderson, and Summerlin. New homes by Toll Brothers, Pulte, KB Home, Taylor Morrison, and more. Nevada Real Estate Group.',
}

export default function NewConstructionPage() {
  return (
    <LifestyleCollectionPage
      title="New Construction Homes in Las Vegas"
      description="The Las Vegas metro area is one of the most active new construction markets in the country. From Summerlin's newest villages to Henderson's expanding master plans and North Las Vegas's value-oriented communities, buyers have access to homes from the nation's top builders with modern floor plans, energy efficiency, and full builder warranties."
      filterFn={(c) => {
        const type = c.type?.toLowerCase() || ''
        return type.includes('new construction') || type.includes('new-construction')
      }}
      slug="new-construction" seoLabel="New Construction"
    />
  )
}
