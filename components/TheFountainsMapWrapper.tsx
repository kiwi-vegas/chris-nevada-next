'use client'
import dynamic from 'next/dynamic'

const TheFountainsMap = dynamic(() => import('./TheFountainsMap'), { ssr: false })

export default function TheFountainsMapWrapper() {
  return <TheFountainsMap />
}
