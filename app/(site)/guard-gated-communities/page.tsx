import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: 'Guard-Gated Communities in Las Vegas | Nevada Real Estate Group',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/guard-gated-communities' },
  description: 'Explore 80+ guard-gated communities in Las Vegas, Henderson, and Summerlin. From $400K to $30M+. 24-hour security, private estates, golf course living. Nevada Real Estate Group.',
}

export default function GuardGatedPage() {
  return (
    <LifestyleCollectionPage
      title="Guard-Gated Communities in Las Vegas"
      description="Las Vegas offers more guard-gated communities than almost any metro in the country. From exclusive Summerlin enclaves to Henderson hillside estates, these communities provide 24-hour security, controlled access, and a level of privacy that open neighborhoods cannot match."
      filterFn={(c) => c.guardGated}
      slug="guard-gated-communities" seoLabel="Guard-Gated Communities"
    />
  )
}
