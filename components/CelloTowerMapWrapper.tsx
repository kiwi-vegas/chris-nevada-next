'use client'
import dynamic from 'next/dynamic'

const CelloTowerMap = dynamic(() => import('./CelloTowerMap'), { ssr: false })

export default function CelloTowerMapWrapper() {
  return <CelloTowerMap />
}
