'use client'
import dynamic from 'next/dynamic'

const SevenHillsStonybrookMap = dynamic(() => import('./SevenHillsStonybrookMap'), { ssr: false })

export default function SevenHillsStonybrookMapWrapper() {
  return <SevenHillsStonybrookMap />
}
