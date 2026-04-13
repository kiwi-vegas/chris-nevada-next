'use client'
import dynamic from 'next/dynamic'

const VeerTowersMap = dynamic(() => import('./VeerTowersMap'), { ssr: false })

export default function VeerTowersMapWrapper() {
  return <VeerTowersMap />
}
