'use client'
import dynamic from 'next/dynamic'

const HendersonAnthemVillageMap = dynamic(() => import('./HendersonAnthemVillageMap'), { ssr: false })

export default function HendersonAnthemVillageMapWrapper() {
  return <HendersonAnthemVillageMap />
}
