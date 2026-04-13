import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: 'Luxury Communities & Homes in Las Vegas | Nevada Real Estate Group',
  description: 'Explore 90+ luxury communities in Las Vegas, Henderson, and Summerlin. Guard-gated estates, custom homes, golf course properties from $1M to $30M+. Nevada Real Estate Group.',
}

export default function LuxuryPage() {
  return (
    <LifestyleCollectionPage
      title="Luxury Communities in Las Vegas"
      description="The Las Vegas luxury real estate market spans from Summerlin's guard-gated estates against Red Rock Canyon to Henderson's hilltop custom homes with Strip views. These communities represent the finest residential offerings in Nevada, with prices ranging from $1 million to over $30 million."
      filterFn={(c) => {
        const type = c.type?.toLowerCase() || ''
        return type.includes('luxury') || type.includes('ultra')
      }}
      seoLabel="Luxury Communities"
    />
  )
}
