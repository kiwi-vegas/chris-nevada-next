'use client'
import dynamic from 'next/dynamic'

const CadenceSierraSageMap = dynamic(() => import('./CadenceSierraSageMap'), { ssr: false })

export default function CadenceSierraSageMapWrapper() {
  return <CadenceSierraSageMap />
}
