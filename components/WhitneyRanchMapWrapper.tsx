'use client'
import dynamic from 'next/dynamic'

const WhitneyRanchMap = dynamic(() => import('./WhitneyRanchMap'), { ssr: false })

export default function WhitneyRanchMapWrapper() {
  return <WhitneyRanchMap />
}
