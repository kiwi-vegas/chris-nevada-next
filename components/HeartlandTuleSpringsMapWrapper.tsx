'use client'
import dynamic from 'next/dynamic'

const HeartlandTuleSpringsMap = dynamic(() => import('./HeartlandTuleSpringsMap'), { ssr: false })

export default function HeartlandTuleSpringsMapWrapper() {
  return <HeartlandTuleSpringsMap />
}
