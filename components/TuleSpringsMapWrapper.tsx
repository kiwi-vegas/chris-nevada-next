'use client'
import dynamic from 'next/dynamic'

const TuleSpringsMap = dynamic(() => import('./TuleSpringsMap'), { ssr: false })

export default function TuleSpringsMapWrapper() {
  return <TuleSpringsMap />
}
