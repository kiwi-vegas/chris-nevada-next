'use client'
import dynamic from 'next/dynamic'

const QueensridgeMap = dynamic(() => import('./QueensridgeMap'), { ssr: false })

export default function QueensridgeMapWrapper() {
  return <QueensridgeMap />
}
