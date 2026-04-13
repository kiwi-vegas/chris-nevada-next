import type { Metadata } from 'next'
import LifestyleCollectionPage from '@/components/LifestyleCollectionPage'

export const metadata: Metadata = {
  title: 'Golf Course Communities in Las Vegas | Nevada Real Estate Group',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/golf-communities' },
  description: 'Explore 30+ golf course communities in Las Vegas, Henderson, and Summerlin. TPC Summerlin, DragonRidge, Bear\'s Best, Southern Highlands, and more. Nevada Real Estate Group.',
}

export default function GolfPage() {
  return (
    <LifestyleCollectionPage
      title="Golf Course Communities in Las Vegas"
      description="Las Vegas is home to over 60 golf courses, and many of the valley's most desirable residential communities are built around championship layouts. From Jack Nicklaus and Arnold Palmer designs in Summerlin to Tom Fazio and Jay Morrish courses across Henderson and the southwest valley, golf community living in Las Vegas delivers year-round play with dramatic desert mountain backdrops."
      filterFn={(c) => {
        const type = c.type?.toLowerCase() || ''
        return type.includes('golf')
      }}
      slug="golf-communities" seoLabel="Golf Communities"
    />
  )
}
