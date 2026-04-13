'use client'
import dynamic from 'next/dynamic'

const SkyvuMap = dynamic(() => import('./SkyvuMap'), { ssr: false })

export default function SkyvuMapWrapper() {
  return <SkyvuMap />
}
