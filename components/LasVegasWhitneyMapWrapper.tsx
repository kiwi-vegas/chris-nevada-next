'use client'
import dynamic from 'next/dynamic'

const LasVegasWhitneyMap = dynamic(() => import('./LasVegasWhitneyMap'), { ssr: false })

export default function LasVegasWhitneyMapWrapper() {
  return <LasVegasWhitneyMap />
}
