'use client'
import dynamic from 'next/dynamic'

const MadeiraCanyonMap = dynamic(() => import('./MadeiraCanyonMap'), { ssr: false })

export default function MadeiraCanyonMapWrapper() {
  return <MadeiraCanyonMap />
}
