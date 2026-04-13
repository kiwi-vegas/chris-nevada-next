'use client'
import dynamic from 'next/dynamic'

const HeritageAtStonebridgeMap = dynamic(() => import('./HeritageAtStonebridgeMap'), { ssr: false })

export default function HeritageAtStonebridgeMapWrapper() {
  return <HeritageAtStonebridgeMap />
}
