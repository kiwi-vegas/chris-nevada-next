'use client'
import dynamic from 'next/dynamic'

const SevenHillsSilverRidgeMap = dynamic(() => import('./SevenHillsSilverRidgeMap'), { ssr: false })

export default function SevenHillsSilverRidgeMapWrapper() {
  return <SevenHillsSilverRidgeMap />
}
