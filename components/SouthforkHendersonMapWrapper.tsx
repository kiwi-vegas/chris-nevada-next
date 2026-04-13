'use client'
import dynamic from 'next/dynamic'

const SouthforkHendersonMap = dynamic(() => import('./SouthforkHendersonMap'), { ssr: false })

export default function SouthforkHendersonMapWrapper() {
  return <SouthforkHendersonMap />
}
