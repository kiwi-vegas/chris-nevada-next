'use client'
import dynamic from 'next/dynamic'

const SoleraAtAnthemMap = dynamic(() => import('./SoleraAtAnthemMap'), { ssr: false })

export default function SoleraAtAnthemMapWrapper() {
  return <SoleraAtAnthemMap />
}
