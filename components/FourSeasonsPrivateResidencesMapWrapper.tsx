'use client'
import dynamic from 'next/dynamic'

const FourSeasonsPrivateResidencesMap = dynamic(() => import('./FourSeasonsPrivateResidencesMap'), { ssr: false })

export default function FourSeasonsPrivateResidencesMapWrapper() {
  return <FourSeasonsPrivateResidencesMap />
}
