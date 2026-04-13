'use client'
import dynamic from 'next/dynamic'

const EldoradoMap = dynamic(() => import('./EldoradoMap'), { ssr: false })

export default function EldoradoMapWrapper() {
  return <EldoradoMap />
}
