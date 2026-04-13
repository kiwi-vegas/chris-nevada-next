'use client'
import dynamic from 'next/dynamic'

const LasVegasCheyenneCorridorMap = dynamic(() => import('./LasVegasCheyenneCorridorMap'), { ssr: false })

export default function LasVegasCheyenneCorridorMapWrapper() {
  return <LasVegasCheyenneCorridorMap />
}
