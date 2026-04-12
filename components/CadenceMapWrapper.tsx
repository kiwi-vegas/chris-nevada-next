'use client'
import dynamic from 'next/dynamic'

const CadenceMap = dynamic(() => import('./CadenceMap'), { ssr: false })

export default function CadenceMapWrapper() {
  return <CadenceMap />
}
