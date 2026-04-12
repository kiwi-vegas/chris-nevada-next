'use client'
import dynamic from 'next/dynamic'

const SevenHillsMap = dynamic(() => import('./SevenHillsMap'), { ssr: false })

export default function SevenHillsMapWrapper() {
  return <SevenHillsMap />
}
