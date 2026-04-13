'use client'
import dynamic from 'next/dynamic'

const TurnberryTowersMap = dynamic(() => import('./TurnberryTowersMap'), { ssr: false })

export default function TurnberryTowersMapWrapper() {
  return <TurnberryTowersMap />
}
