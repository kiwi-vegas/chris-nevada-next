'use client'
import dynamic from 'next/dynamic'

const GreenValleySouthMap = dynamic(() => import('./GreenValleySouthMap'), { ssr: false })

export default function GreenValleySouthMapWrapper() {
  return <GreenValleySouthMap />
}
