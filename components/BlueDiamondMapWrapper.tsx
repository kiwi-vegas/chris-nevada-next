'use client'
import dynamic from 'next/dynamic'

const BlueDiamondMap = dynamic(() => import('./BlueDiamondMap'), { ssr: false })

export default function BlueDiamondMapWrapper() {
  return <BlueDiamondMap />
}
