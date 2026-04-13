'use client'
import dynamic from 'next/dynamic'

const RomaHillsMap = dynamic(() => import('./RomaHillsMap'), { ssr: false })

export default function RomaHillsMapWrapper() {
  return <RomaHillsMap />
}
