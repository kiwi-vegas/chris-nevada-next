'use client'
import dynamic from 'next/dynamic'

const DragonRockMap = dynamic(() => import('./DragonRockMap'), { ssr: false })

export default function DragonRockMapWrapper() {
  return <DragonRockMap />
}
