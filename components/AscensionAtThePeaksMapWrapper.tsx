'use client'
import dynamic from 'next/dynamic'

const AscensionAtThePeaksMap = dynamic(() => import('./AscensionAtThePeaksMap'), { ssr: false })

export default function AscensionAtThePeaksMapWrapper() {
  return <AscensionAtThePeaksMap />
}
