'use client'
import dynamic from 'next/dynamic'

const AstraAtLaMadrePeaksMap = dynamic(() => import('./AstraAtLaMadrePeaksMap'), { ssr: false })

export default function AstraAtLaMadrePeaksMapWrapper() {
  return <AstraAtLaMadrePeaksMap />
}
