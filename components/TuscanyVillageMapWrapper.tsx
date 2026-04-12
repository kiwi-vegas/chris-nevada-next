'use client'
import dynamic from 'next/dynamic'

const TuscanyVillageMap = dynamic(() => import('./TuscanyVillageMap'), { ssr: false })

export default function TuscanyVillageMapWrapper() {
  return <TuscanyVillageMap />
}
