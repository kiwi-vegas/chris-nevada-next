'use client'
import dynamic from 'next/dynamic'

const LasVegasSpringValleySouthMap = dynamic(() => import('./LasVegasSpringValleySouthMap'), { ssr: false })

export default function LasVegasSpringValleySouthMapWrapper() {
  return <LasVegasSpringValleySouthMap />
}
