'use client'
import dynamic from 'next/dynamic'

const CrestaRosaMap = dynamic(() => import('./CrestaRosaMap'), { ssr: false })

export default function CrestaRosaMapWrapper() {
  return <CrestaRosaMap />
}
