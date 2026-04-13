'use client'
import dynamic from 'next/dynamic'

const ShawoodAtArcadiaMap = dynamic(() => import('./ShawoodAtArcadiaMap'), { ssr: false })

export default function ShawoodAtArcadiaMapWrapper() {
  return <ShawoodAtArcadiaMap />
}
