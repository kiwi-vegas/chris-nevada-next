'use client'
import dynamic from 'next/dynamic'

const LasVegasRhodesRanchSouthMap = dynamic(() => import('./LasVegasRhodesRanchSouthMap'), { ssr: false })

export default function LasVegasRhodesRanchSouthMapWrapper() {
  return <LasVegasRhodesRanchSouthMap />
}
